console.warn = function(){};
            
THREE.PylonGeometry = function(radius_, height_, offset_){

    THREE.Geometry.call( this );
    this.type = 'PylonGeometry';

    this.parameters = {

        raidus: radius_,
        height: height_,

    };

    this.HUD = {label: "", p: new THREE.Vector3(1E-5, offset_ + height_ + 8.0, 1E-5) };

    this.fromBufferGeometry( new THREE.PylonBufferGeometry(radius_, height_, offset_) );

    this.mergeVertices();
    this.computeVertexNormals();
    this.computeFaceNormals();

    this.faces.forEach(function(f_){  f_.materialIndex = 0; } );
    this.faces[3].materialIndex = 1;

}

THREE.PylonGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREE.PylonGeometry.prototype.constructor = THREE.PylonGeometry;

THREE.PylonBufferGeometry = function(radius_, height_, offset_){

    THREE.BufferGeometry.call( this );

    this.type = "PylonBufferGeometry";

    this.parameters = {

        raidus: radius_,
        height: height_,

    };

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = [];

    vertices.push(0, offset_, 0);

    for(var i = 0; i < 3; i++){

        var dx = radius_ * Math.cos(Math.PI * 2 / 3 * i);
        var dy = offset_ + height_;
        var dz = radius_ * Math.sin(Math.PI * 2 / 3 * i);

        vertices.push(dx, dy, dz);

    }

    indices.push(0, 1, 2, 0, 2, 3, 0, 3, 1, 3, 2, 1);

    for(var i = 0; i < indices.length / 3; i++){

        var a = new THREE.Vector3(vertices[i], offset_ + vertices[i + 1], vertices[i + 2]);
        var b = new THREE.Vector3(vertices[(i + 1)], offset_ + vertices[(i + 1) + 1], vertices[(i + 2) + 2]);
        var c = new THREE.Vector3(vertices[(i + 2)], offset_ + vertices[(i + 2) + 1], vertices[(i + 2) + 2]);

        var ab = b.sub(b);
        var ac = b.sub(c);
        var n = ab.cross(ac);   

        normals.push(n.x, n.y, n.z);
        //uvs.push( u, 1 - v );

    }

    this.setIndex( indices );
    this.addAttribute( "position", new THREE.Float32BufferAttribute( vertices, 3 ) );
    this.addAttribute( "normal", new THREE.Float32BufferAttribute( normals, 3 ) );
    this.addAttribute( "uv", new THREE.Float32BufferAttribute( uvs, 2 ) );

}

THREE.PylonBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
THREE.PylonBufferGeometry.prototype.constructor = THREE.PylonBufferGeometry;
