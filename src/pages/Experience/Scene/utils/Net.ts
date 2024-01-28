import {
  Color3,
  DistanceConstraint,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsBody,
  PhysicsShapeType,
  Scene,
  StandardMaterial,
  TransformNode,
  Vector3,
  VertexBuffer,
  VertexData,
} from "@babylonjs/core";

class Net {
  private _scene: Scene;
  private _parent: TransformNode;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;
  constructor(parent: TransformNode, scene: Scene) {
    this._scene = scene;
    this._parent = parent;
    this.createGeometry();
    this.attachPhysicsComponent();
  }

  public createGeometry() {
    this.geometry = MeshBuilder.CreateCylinder(
      "net",
      {
        diameterTop: 2,
        diameterBottom: 2 * 0.5,
        height: 2,
        cap: Mesh.NO_CAP,
        sideOrientation: Mesh.DOUBLESIDE,
        subdivisions: 2,
        hasRings: true,
      },
      this._scene
    );

    const material = new StandardMaterial("netMat", this._scene);
    this.geometry.material = material;
    material.diffuseColor = Color3.White();
    material.alpha = 0.5;
    this.geometry.material.wireframe = true;

    this.geometry.parent = this._parent;

    this.geometry.position.y = 15;
    this.geometry.position.z = -2.5;

    // this.createDistanceJoints(this.geometry!);
  }

  public attachPhysicsComponent(): void {
    this.aggregate = new PhysicsAggregate(
      this.geometry!,
      PhysicsShapeType.MESH,
      { mass: 0, restitution: 0.75 },
      this._scene
    );
  }

  private createJoint(
    bodyA: PhysicsBody,
    bodyB: PhysicsBody,
    distance: number
  ) {
    const constraint = new DistanceConstraint(distance, this._scene);
    // constraint.isCollisionsEnabled = false;
    bodyA.addConstraint(bodyB, constraint);
  }

  public createDistanceJoints(geometry: Mesh) {
    const positions = geometry.getVerticesData(VertexBuffer.PositionKind);
    const newPos = positions?.reverse();
    const indices = geometry.getIndices();
    const newIndices = indices?.reverse();

    const spheres: Mesh[] = [];

    const sphereContainer = new TransformNode("_sim", this._scene);
    sphereContainer.position = geometry.absolutePosition;
    const mat0 = new StandardMaterial("free", this._scene);
    const mat1 = new StandardMaterial("constrained", this._scene);
    mat1.emissiveColor = new Color3(1, 0, 0);

    for (let i = 0; i < newPos!.length; i = i + 3) {
      const v = Vector3.FromArray(newPos!, i);
      const c = Math.floor(i / 3) < 25;

      const s = MeshBuilder.CreateSphere(
        "s" + i,
        { diameter: 0.1 },
        this._scene
      );

      s.position.copyFrom(v);
      s.parent = sphereContainer;
      spheres.push(s);
      s.metadata = {
        linked: [],
      };
      s.isVisible = true;
      if (c) {
        s.material = mat1;
      } else {
        s.material = mat0;
      }
      s.metadata.basePosition = s.position.clone();
    }

    for (let i = 0; i < newIndices!.length; i += 3) {
      for (let j = 0; j < 3; j++) {
        const idx0 = newIndices![i + j];
        const idx1 = newIndices![i + ((j + 1) % 3)];

        spheres[idx0].metadata.distance = Vector3.Distance(
          spheres[idx0].position,
          spheres[idx1].position
        );
      }
    }

    spheres.forEach((point) => {
      const mass = point.material === mat1 ? 0 : 1;
      const aggregate = new PhysicsAggregate(
        point,
        PhysicsShapeType.SPHERE,
        { mass },
        this._scene
      );

      point.metadata.body = aggregate.body;
    });

    for (let i = 0; i < newIndices!.length; i += 3) {
      for (let j = 0; j < 3; j++) {
        const idx0 = newIndices![i + j];
        const idx1 = newIndices![i + ((j + 1) % 3)];
        if (!spheres[idx0].metadata.linked.includes(idx1)) {
          this.createJoint(
            spheres[idx0].metadata.body,
            spheres[idx1].metadata.body,
            Vector3.Distance(spheres[idx0].position, spheres[idx1].position)
          );
          spheres[idx0].metadata.linked.push(idx1);
          spheres[idx1].metadata.linked.push(idx0);
        }
      }
    }

    geometry.registerBeforeRender(function () {
      const positions = [];
      spheres.forEach((s) => {
        positions.push(s.position.x, s.position.y, s.position.z);
      });
      geometry.setVerticesData(VertexBuffer.PositionKind, positions, true);
      const normals = [];
      const facetNormals = [];
      VertexData.ComputeNormals(positions, geometry.getIndices(), normals);
      geometry.setVerticesData(VertexBuffer.NormalKind, normals, true);

      geometry.refreshBoundingInfo();
    });
  }
}

export default Net;
