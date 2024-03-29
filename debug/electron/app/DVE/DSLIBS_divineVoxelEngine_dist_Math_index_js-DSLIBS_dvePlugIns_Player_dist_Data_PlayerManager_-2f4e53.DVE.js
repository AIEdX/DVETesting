"use strict";
(self["webpackChunkdve_testing"] = self["webpackChunkdve_testing"] || []).push([["DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_dvePlugIns_Player_dist_Data_PlayerManager_-2f4e53"],{

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/BoundingBox.js":
/*!***********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/BoundingBox.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoundingBox": () => (/* binding */ BoundingBox)
/* harmony export */ });
class BoundingBox {
    topPlane;
    bottomPlane;
    northPlane;
    southPlane;
    eastPlane;
    westPlane;
    bounds = {
        minX: Infinity,
        maxX: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
    };
    constructor(data) {
        this.topPlane = data.topPlane;
        this._doMinMaxCheck(this.topPlane);
        this.bottomPlane = data.bottomPlane;
        this._doMinMaxCheck(this.bottomPlane);
        this.northPlane = data.northPlane;
        this._doMinMaxCheck(this.northPlane);
        this.southPlane = data.southPlane;
        this._doMinMaxCheck(this.southPlane);
        this.eastPlane = data.eastPlane;
        this._doMinMaxCheck(this.eastPlane);
        this.westPlane = data.westPlane;
        this._doMinMaxCheck(this.westPlane);
    }
    _doMinMaxCheck(plane) {
        if (plane.minX <= this.bounds.minX)
            this.bounds.minX = plane.minX;
        if (plane.maxX >= this.bounds.maxX)
            this.bounds.maxX = plane.maxX;
        if (plane.minY <= this.bounds.minY)
            this.bounds.minY = plane.minY;
        if (plane.maxY >= this.bounds.maxY)
            this.bounds.maxY = plane.maxY;
        if (plane.minZ <= this.bounds.minZ)
            this.bounds.minZ = plane.minZ;
        if (plane.maxZ >= this.bounds.maxZ)
            this.bounds.maxZ = plane.maxZ;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Plane.js":
/*!*****************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Plane.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Plane": () => (/* binding */ Plane)
/* harmony export */ });
class Plane {
    v1;
    v2;
    v3;
    v4;
    minX = Infinity;
    maxX = -Infinity;
    minZ = Infinity;
    maxZ = -Infinity;
    minY = Infinity;
    maxY = -Infinity;
    constructor(data) {
        this.v1 = data.v1;
        this.v2 = data.v2;
        this.v3 = data.v3;
        this.v4 = data.v4;
        this._minMaxCompare(this.v1, this.v2);
        this._minMaxCompare(this.v1, this.v3);
        this._minMaxCompare(this.v1, this.v4);
        this._minMaxCompare(this.v2, this.v3);
        this._minMaxCompare(this.v2, this.v4);
        this._minMaxCompare(this.v3, this.v4);
    }
    _compareVales(v1, v2, axis, minProperty, maxProperty) {
        const c1 = v1;
        const c2 = v2;
        if (c1[axis] < this[minProperty]) {
            if (c1[axis] <= c2[axis]) {
                this[minProperty] = c1[axis];
            }
        }
        if (c2[axis] < this[minProperty]) {
            if (c2[axis] <= c1[axis]) {
                this[minProperty] = c2[axis];
            }
        }
        if (c1[axis] > this[maxProperty]) {
            if (c1[axis] >= c2[axis]) {
                this[maxProperty] = c1[axis];
            }
        }
        if (c2[axis] > this[maxProperty]) {
            if (c2[axis] >= c1[axis]) {
                this[maxProperty] = c2[axis];
            }
        }
    }
    _minMaxCompare(v1, v2) {
        this._compareVales(v1, v2, "x", "minX", "maxX");
        this._compareVales(v1, v2, "y", "minY", "maxY");
        this._compareVales(v1, v2, "z", "minZ", "maxZ");
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/SimpleBoundingBox.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/SimpleBoundingBox.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleBoundingBox": () => (/* binding */ SimpleBoundingBox)
/* harmony export */ });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");

class SimpleBoundingBox {
    origin;
    dimensions;
    bounds = {
        minX: Infinity,
        maxX: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
    };
    checkBounds = {
        minX: Infinity,
        maxX: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
    };
    checkOrigin = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    _voxelCheckMap = {};
    _voxelCheckPoints = [];
    _voxelBottomCheckPoints = [];
    _voxelOriginPoints = [];
    constructor(origin, dimensions) {
        this.origin = origin;
        this.dimensions = dimensions;
        const ov = origin;
        this.checkOrigin.updateVector(ov.x, ov.y, ov.z);
        this._updateBounds();
        this._updateCheckBounds();
    }
    _updateBounds() {
        const ov = this.origin;
        this.bounds.minX = ov.x - this.dimensions.w / 2;
        this.bounds.maxX = ov.x + this.dimensions.w / 2;
        this.bounds.minZ = ov.z - this.dimensions.d / 2;
        this.bounds.maxZ = ov.z + this.dimensions.d / 2;
        this.bounds.minY = ov.y - this.dimensions.h / 2;
        this.bounds.maxY = ov.y + this.dimensions.h / 2;
    }
    _updateCheckBounds() {
        const cv = this.checkOrigin;
        this.checkBounds.minX = cv.x - this.dimensions.w / 2;
        this.checkBounds.maxX = cv.x + this.dimensions.w / 2;
        this.checkBounds.minZ = cv.z - this.dimensions.d / 2;
        this.checkBounds.maxZ = cv.z + this.dimensions.d / 2;
        this.checkBounds.minY = cv.y - this.dimensions.h / 2;
        this.checkBounds.maxY = cv.y + this.dimensions.h / 2;
    }
    updateOrigin(x, y, z) {
        this.origin.updateVector(x, y, z);
        this.origin.roundVector(2);
        this._updateBounds();
    }
    setOriginToCheckOrigin() {
        const cv = this.checkOrigin;
        this.origin.updateVector(cv.x, cv.y, cv.z);
        this.bounds.minX = this.checkBounds.minX;
        this.bounds.maxX = this.checkBounds.maxX;
        this.bounds.minZ = this.checkBounds.minZ;
        this.bounds.maxZ = this.checkBounds.maxZ;
        this.bounds.minY = this.checkBounds.minY;
        this.bounds.maxY = this.checkBounds.maxY;
    }
    setCheckOrigin(x, y, z) {
        this.checkOrigin.updateVector(x, y, z);
        this._updateCheckBounds();
    }
    getCurrentOriginPoints() {
        this._voxelOriginPoints = [];
        const mx = this.bounds.minX;
        const my = this.bounds.minY;
        const mz = this.bounds.minZ;
        for (let y = my; y <= this.bounds.maxY; y++) {
            for (let x = mx - 1; x <= this.bounds.maxX + 1; x++) {
                for (let z = mz - 1; z <= this.bounds.maxZ + 1; z++) {
                    const key = this._getPositionKey(x, y, z);
                    if (!this._voxelCheckMap[key]) {
                        this._voxelOriginPoints.push([x, y, z]);
                        this._voxelCheckMap[key] = true;
                    }
                }
            }
        }
        this._voxelCheckMap = {};
        return this._voxelOriginPoints;
    }
    getVoxelCheckPoints() {
        this._voxelCheckPoints = [];
        const mx = this.checkBounds.minX;
        const my = this.checkBounds.minY;
        const mz = this.checkBounds.minZ;
        for (let y = my; y <= this.checkBounds.maxY; y++) {
            for (let x = mx; x <= this.checkBounds.maxX + 1; x++) {
                for (let z = mz; z <= this.checkBounds.maxZ + 1; z++) {
                    const key = this._getPositionKey(x, y, z);
                    if (!this._voxelCheckMap[key]) {
                        this._voxelCheckPoints.push([
                            Math.floor(x),
                            Math.floor(y),
                            Math.floor(z),
                        ]);
                        this._voxelCheckMap[key] = true;
                    }
                }
            }
        }
        this._voxelCheckMap = {};
        return this._voxelCheckPoints;
    }
    getVoxelBottomCheckPoints() {
        this._voxelBottomCheckPoints = [];
        const mx = this.checkBounds.minX;
        const my = this.checkBounds.minY;
        const mz = this.checkBounds.minZ;
        for (let y = my - 1; y <= my; y++) {
            for (let x = mx; x <= this.checkBounds.maxX + 1; x++) {
                for (let z = mz; z <= this.checkBounds.maxZ + 1; z++) {
                    const key = this._getPositionKey(x, y, z);
                    if (!this._voxelCheckMap[key]) {
                        this._voxelBottomCheckPoints.push([
                            Math.floor(x),
                            Math.floor(y),
                            Math.floor(z),
                        ]);
                        this._voxelCheckMap[key] = true;
                    }
                }
            }
        }
        this._voxelCheckMap = {};
        return this._voxelBottomCheckPoints;
    }
    _getPositionKey(x, y, z) {
        return `${x}-${y}-${z}`;
    }
    isPointInsideBox(point) {
        const box = this.bounds;
        return (point.x >= box.minX &&
            point.x <= box.maxX &&
            point.y >= box.minY &&
            point.y <= box.maxY &&
            point.z >= box.minZ &&
            point.z <= box.maxZ);
    }
    doesBoxIntersect(testBox) {
        const box = this.bounds;
        return (box.minX <= testBox.maxX &&
            box.maxX >= testBox.minX &&
            box.minY <= testBox.maxY &&
            box.maxY >= testBox.minY &&
            box.minZ <= testBox.maxZ &&
            box.maxZ >= testBox.minZ);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector3": () => (/* binding */ Vector3)
/* harmony export */ });
class Vector3 {
    x = 0;
    y = 0;
    z = 0;
    _tv3 = {
        x: 0,
        y: 0,
        z: 0,
    };
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    updateFromArray(array, startIndex = 0) {
        this.x = array[startIndex];
        this.y = array[startIndex + 1];
        this.z = array[startIndex + 2];
    }
    updateVector(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    updateFromVec3(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }
    roundVector(deciamlPoints = 2) {
        this.x = Number(this.x.toFixed(deciamlPoints));
        this.y = Number(this.y.toFixed(deciamlPoints));
        this.z = Number(this.z.toFixed(deciamlPoints));
    }
    translate(x, y, z) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.z = this.z + z;
        return this;
    }
    getTranslated(x, y, z) {
        this._tv3.x = this.x + x;
        this._tv3.y = this.y + y;
        this._tv3.z = this.z + z;
        return this._tv3;
    }
    scaleXYZ(scaler) {
        this.x = this.x * scaler;
        this.y = this.y * scaler;
        this.z = this.z * scaler;
        return this;
    }
    scale(xScale, yScale, zScale) {
        this.x = this.x * xScale;
        this.y = this.y * yScale;
        this.z = this.z * zScale;
        return this;
    }
    getScaledXYZ(scaler) {
        this._tv3.x = this.x * scaler;
        this._tv3.y = this.y * scaler;
        this._tv3.z = this.z * scaler;
        return this._tv3;
    }
    getScaled(xScale, yScale, zScale) {
        this._tv3.x = this.x * xScale;
        this._tv3.y = this.y * yScale;
        this._tv3.z = this.z * zScale;
        return this._tv3;
    }
    addXYZ(add) {
        this.x = this.x + add;
        this.y = this.y + add;
        this.z = this.z + add;
        return this;
    }
    addFromVec3(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }
    isZero() {
        return !this.x && !this.y && !this.z;
    }
    subtractXYZ(subtract) {
        this.x = this.x - subtract;
        this.y = this.y - subtract;
        this.z = this.z - subtract;
        return this;
    }
    subtractFromObj(vector) {
        this.x = this.x - vector.x;
        this.y = this.y - vector.y;
        this.z = this.z - vector.z;
        return this;
    }
    getAddXYZ(add) {
        this._tv3.x = this.x + add;
        this._tv3.y = this.y + add;
        this._tv3.z = this.z + add;
        return this._tv3;
    }
    getSubtractXYZ(subtract) {
        this._tv3.x = this.x - subtract;
        this._tv3.y = this.y - subtract;
        this._tv3.z = this.z - subtract;
        return this._tv3;
    }
    addVector(vector3) {
        this.x = vector3.x + this.x;
        this.y = vector3.y + this.y;
        this.z = vector3.z + this.z;
        return this;
    }
    getAddedVector(vector3) {
        this._tv3.x = vector3.x + this.x;
        this._tv3.y = vector3.y + this.y;
        this._tv3.z = vector3.z + this.z;
        return this._tv3;
    }
    subtractVector(vector3) {
        this.x = this.x - vector3.x;
        this.y = this.y - vector3.y;
        this.z = this.z - vector3.z;
        return this;
    }
    getSubtractedVector(vector3) {
        this._tv3.x = this.x - vector3.x;
        this._tv3.y = this.y - vector3.y;
        this._tv3.z = this.z - vector3.z;
        return this._tv3;
    }
    scaleVector(vector3) {
        this.x = this.x * vector3.x;
        this.y = this.y * vector3.y;
        this.z = this.z * vector3.z;
        return this;
    }
    getScaledVector(vector3) {
        this._tv3.x = this.x * vector3.x;
        this._tv3.y = this.y * vector3.y;
        this._tv3.z = this.z * vector3.z;
        return this._tv3;
    }
    getLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    divide(scalar) {
        this.x = this.x / scalar;
        this.y = this.y / scalar;
        this.z = this.z / scalar;
        return this;
    }
    getDivided(scalar) {
        this._tv3.x = this.x / scalar;
        this._tv3.y = this.y / scalar;
        this._tv3.z = this.z / scalar;
        return this._tv3;
    }
    normalize() {
        return this.divide(this.getLength());
    }
    isEqual(vector3) {
        if (this.x != vector3.x) {
            return false;
        }
        if (this.y != vector3.y) {
            return false;
        }
        if (this.z != vector3.z) {
            return false;
        }
        return true;
    }
    isNotEqual(vector3) {
        if (this.x != vector3.x) {
            return true;
        }
        if (this.y != vector3.y) {
            return true;
        }
        if (this.z != vector3.z) {
            return true;
        }
        return false;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance2d.js":
/*!************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance2d.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Distance2D": () => (/* binding */ Distance2D)
/* harmony export */ });
function Distance2D(x1, x2, y1, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js":
/*!************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Distance3D": () => (/* binding */ Distance3D)
/* harmony export */ });
function Distance3D(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/DistnaceSort.js":
/*!**************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Functions/DistnaceSort.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocationDataDistanceSort": () => (/* binding */ LocationDataDistanceSort),
/* harmony export */   "Vec3ArrayDistanceSort": () => (/* binding */ Vec3ArrayDistanceSort)
/* harmony export */ });
/* harmony import */ var _Distance3d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Distance3d.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js");

function Vec3ArrayDistanceSort(origion, array) {
    //filter tasks to keep them close to the player
    return array.sort((a, b) => {
        const aDistance = (0,_Distance3d_js__WEBPACK_IMPORTED_MODULE_0__.Distance3D)(a[0], a[1], a[2], origion[0], origion[1], origion[2]);
        const bDistance = (0,_Distance3d_js__WEBPACK_IMPORTED_MODULE_0__.Distance3D)(b[0], b[1], b[2], origion[0], origion[1], origion[2]);
        //if a is closer then b put it first
        if (aDistance < bDistance)
            return -1;
        //if b is closer then a put it first
        if (aDistance > bDistance)
            return 1;
        //no change
        return 0;
    });
}
function LocationDataDistanceSort(origion, array) {
    //filter tasks to keep them close to the player
    return array.sort((a, b) => {
        const aDistance = (0,_Distance3d_js__WEBPACK_IMPORTED_MODULE_0__.Distance3D)(a[1], a[2], a[3], origion[1], origion[2], origion[3]);
        const bDistance = (0,_Distance3d_js__WEBPACK_IMPORTED_MODULE_0__.Distance3D)(b[1], b[2], b[3], origion[1], origion[2], origion[3]);
        //if a is closer then b put it first
        if (aDistance < bDistance)
            return -1;
        //if b is closer then a put it first
        if (aDistance > bDistance)
            return 1;
        //no change
        return 0;
    });
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/VisitAll.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Functions/VisitAll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisitAll": () => (/* binding */ VisitAll)
/* harmony export */ });
/** # Visit All
 * ---
 * Given a starting point and an end point it will visit all voxels that are between them.
 * @param startPoint
 * @param endPoint
 * @param visitor
 * @returns an array of numbers with a stride of 3 for positions
 */
const VisitAll = (startPoint, endPoint, visitor = (x, y, z) => {
    return true;
}) => {
    const gx0 = startPoint.x;
    const gy0 = startPoint.y;
    const gz0 = startPoint.z;
    const gx1 = endPoint.x;
    const gy1 = endPoint.y;
    const gz1 = endPoint.z;
    const positons = [];
    const gx0idx = Math.floor(gx0);
    const gy0idx = Math.floor(gy0);
    const gz0idx = Math.floor(gz0);
    const gx1idx = Math.floor(gx1);
    const gy1idx = Math.floor(gy1);
    const gz1idx = Math.floor(gz1);
    const sx = gx1idx > gx0idx ? 1 : gx1idx < gx0idx ? -1 : 0;
    const sy = gy1idx > gy0idx ? 1 : gy1idx < gy0idx ? -1 : 0;
    const sz = gz1idx > gz0idx ? 1 : gz1idx < gz0idx ? -1 : 0;
    let gx = gx0idx;
    let gy = gy0idx;
    let gz = gz0idx;
    const gxp = gx0idx + (gx1idx > gx0idx ? 1 : 0);
    const gyp = gy0idx + (gy1idx > gy0idx ? 1 : 0);
    const gzp = gz0idx + (gz1idx > gz0idx ? 1 : 0);
    const vx = gx1 === gx0 ? 1 : gx1 - gx0;
    const vy = gy1 === gy0 ? 1 : gy1 - gy0;
    const vz = gz1 === gz0 ? 1 : gz1 - gz0;
    const vxvy = vx * vy;
    const vxvz = vx * vz;
    const vyvz = vy * vz;
    let errx = (gxp - gx0) * vyvz;
    let erry = (gyp - gy0) * vxvz;
    let errz = (gzp - gz0) * vxvy;
    const derrx = sx * vyvz;
    const derry = sy * vxvz;
    const derrz = sz * vxvy;
    do {
        if (!visitor(gx, gy, gz))
            break;
        positons.push(gx, gy, gz);
        if (gx === gx1idx && gy === gy1idx && gz === gz1idx)
            break;
        let xr = Math.abs(errx);
        let yr = Math.abs(erry);
        let zr = Math.abs(errz);
        if (sx !== 0 && (sy === 0 || xr < yr) && (sz === 0 || xr < zr)) {
            gx += sx;
            errx += derrx;
        }
        else if (sy !== 0 && (sz === 0 || yr < zr)) {
            gy += sy;
            erry += derry;
        }
        else if (sz !== 0) {
            gz += sz;
            errz += derrz;
        }
    } while (true);
    return positons;
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Types/Math.types.js":
/*!********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Types/Math.types.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/VoxelMath.js":
/*!*************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/VoxelMath.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelMath": () => (/* binding */ VoxelMath)
/* harmony export */ });
/* harmony import */ var _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/BoundingBox.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/BoundingBox.js");
/* harmony import */ var _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/Plane.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Plane.js");
/* harmony import */ var _Classes_SimpleBoundingBox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Classes/SimpleBoundingBox.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/SimpleBoundingBox.js");
/* harmony import */ var _Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");
/* harmony import */ var _Functions_VisitAll_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Functions/VisitAll.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/VisitAll.js");





/**# Voxel Math
 * ---
 * Can be used in any thread that needs it.
 * Has functions for collision detection, finding voxels in a direction, and path finding.
 */
const VoxelMath = {
    visitAll: _Functions_VisitAll_js__WEBPACK_IMPORTED_MODULE_4__.VisitAll,
    getVector3(x, y, z) {
        return new _Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_3__.Vector3(x, y, z);
    },
    getPlane(pv1, pv2, pv3, pv4) {
        return new _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_1__.Plane({
            v1: pv1,
            v2: pv2,
            v3: pv3,
            v4: pv4,
        });
    },
    getSimpleBoundingBox(origin, dimensions) {
        return new _Classes_SimpleBoundingBox_js__WEBPACK_IMPORTED_MODULE_2__.SimpleBoundingBox(origin, dimensions);
    },
    getBoundingBox(data) {
        return new _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_0__.BoundingBox(data);
    },
    convertToOriginGridSpace(position) {
        position[0] = Math.round(position[0]) + 0.5;
        position[1] = Math.round(position[1]) + 0.5;
        position[2] = Math.round(position[2]) + 0.5;
        return position;
    },
    distance2D(x1, x2, y1, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },
    distance3D(x1, y1, z1, x2, y2, z2) {
        const a = x2 - x1;
        const b = y2 - y1;
        const c = z2 - z1;
        return Math.sqrt(a * a + b * b + c * c);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/index.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoundingBox": () => (/* reexport safe */ _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_1__.BoundingBox),
/* harmony export */   "Distance2D": () => (/* reexport safe */ _Functions_Distance2d_js__WEBPACK_IMPORTED_MODULE_5__.Distance2D),
/* harmony export */   "Distance3D": () => (/* reexport safe */ _Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_6__.Distance3D),
/* harmony export */   "LocationDataDistanceSort": () => (/* reexport safe */ _Functions_DistnaceSort_js__WEBPACK_IMPORTED_MODULE_7__.LocationDataDistanceSort),
/* harmony export */   "Plane": () => (/* reexport safe */ _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_2__.Plane),
/* harmony export */   "SimpleBoundingBox": () => (/* reexport safe */ _Classes_SimpleBoundingBox_js__WEBPACK_IMPORTED_MODULE_3__.SimpleBoundingBox),
/* harmony export */   "Vec3ArrayDistanceSort": () => (/* reexport safe */ _Functions_DistnaceSort_js__WEBPACK_IMPORTED_MODULE_7__.Vec3ArrayDistanceSort),
/* harmony export */   "Vector3": () => (/* reexport safe */ _Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_4__.Vector3),
/* harmony export */   "VisitAll": () => (/* reexport safe */ _Functions_VisitAll_js__WEBPACK_IMPORTED_MODULE_8__.VisitAll),
/* harmony export */   "VoxelMath": () => (/* reexport safe */ _VoxelMath_js__WEBPACK_IMPORTED_MODULE_0__.VoxelMath)
/* harmony export */ });
/* harmony import */ var _VoxelMath_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VoxelMath.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/VoxelMath.js");
/* harmony import */ var _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/BoundingBox.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/BoundingBox.js");
/* harmony import */ var _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Classes/Plane.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Plane.js");
/* harmony import */ var _Classes_SimpleBoundingBox_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Classes/SimpleBoundingBox.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/SimpleBoundingBox.js");
/* harmony import */ var _Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");
/* harmony import */ var _Functions_Distance2d_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Functions/Distance2d.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance2d.js");
/* harmony import */ var _Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Functions/Distance3d.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js");
/* harmony import */ var _Functions_DistnaceSort_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Functions/DistnaceSort.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/DistnaceSort.js");
/* harmony import */ var _Functions_VisitAll_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Functions/VisitAll.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/VisitAll.js");
/* harmony import */ var _Types_Math_types_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Types/Math.types.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Types/Math.types.js");













/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerManager.js":
/*!*****************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerManager.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerManager": () => (/* binding */ PlayerManager)
/* harmony export */ });
const PlayerManager = {
    currentDimension: "main",
    physics: {},
    stats: {},
    $INIt(data) { },
};


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js":
/*!*********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerPhysicsData": () => (/* binding */ PlayerPhysicsData),
/* harmony export */   "PlayerPhysicsStatesValues": () => (/* binding */ PlayerPhysicsStatesValues),
/* harmony export */   "PlayerPhysicsTagIDs": () => (/* binding */ PlayerPhysicsTagIDs),
/* harmony export */   "PlayerPhysicsTags": () => (/* binding */ PlayerPhysicsTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");

const PlayerPhysicsStatesValues = {
    still: 0,
    secondaryStill: 1,
    walkingForward: 2,
    walkingBackward: 3,
    walkingLeft: 4,
    walkingRight: 5,
};
const PlayerPhysicsTagIDs = {
    header: "#header",
    position: "#position",
    pickPosition: "#pick-position",
    pickNormals: "#pick-normals",
    direction: "#direction",
    sideDirection: "#side-direction",
    rotation: "#rotation",
    eyeLevel: "#eye-level",
    states: {
        movement: "#movement-state",
        secondaryMovement: "#secondary-movement-state",
        jumping: "#is-jumping",
        running: "#is-running",
        onGround: "#is-on-ground",
        inWater: "#is-in-water",
    },
};
const PlayerPhysicsTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("player-physics-tags");
class DBTVec3 {
    tagId;
    parent;
    constructor(tagId, parent) {
        this.tagId = tagId;
        if (parent) {
            this.parent = parent;
        }
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get x() {
        return this.parent.tags.getArrayTagValue(this.tagId, 0);
    }
    set x(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 0, v);
    }
    get y() {
        return this.parent.tags.getArrayTagValue(this.tagId, 1);
    }
    set y(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 1, v);
    }
    get z() {
        return this.parent.tags.getArrayTagValue(this.tagId, 2);
    }
    set z(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 2, v);
    }
    getAsArray() {
        return [this.x, this.y, this.z];
    }
}
class PlayerPhysicsData {
    tags;
    constructor(buffer, initData) {
        this.tags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("player-physics-tags");
        this.tags.$INIT(initData);
        this.tags.setBuffer(buffer);
        this.pick._s = this;
        this.states._s = this;
        this.is._s = this;
        this.nowIs._s = this;
    }
    position = new DBTVec3(PlayerPhysicsTagIDs.position, this);
    pick = {
        _s: {},
        normal: new DBTVec3(PlayerPhysicsTagIDs.pickNormals, this),
        position: new DBTVec3(PlayerPhysicsTagIDs.pickPosition, this),
        getPlacePosition() {
            return [
                this.position.x + this.normal.x,
                this.position.y + this.normal.y,
                this.position.z + this.normal.z,
            ];
        },
        getPlaceVec3() {
            return {
                x: this.position.x + this.normal.x,
                y: this.position.y + this.normal.y,
                z: this.position.z + this.normal.z,
            };
        },
    };
    direction = new DBTVec3(PlayerPhysicsTagIDs.direction, this);
    sideDirection = new DBTVec3(PlayerPhysicsTagIDs.sideDirection, this);
    rotation = new DBTVec3(PlayerPhysicsTagIDs.rotation, this);
    states = {
        _s: {},
        get movement() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.movement);
        },
        set movement(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.movement, v);
        },
        get secondaryMovement() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.secondaryMovement);
        },
        set secondaryMovement(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.secondaryMovement, v);
        },
        get jumping() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.jumping);
        },
        set jumping(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.jumping, v);
        },
        get running() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.running);
        },
        set running(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.running, v);
        },
        get onGround() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.onGround) == 1;
        },
        set onGround(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.onGround, v ? 1 : 0);
        },
        get inWater() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.inWater) == 1;
        },
        set inWater(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.inWater, v ? 1 : 0);
        },
    };
    get eyeLevel() {
        return this.tags.getTag(PlayerPhysicsTagIDs.eyeLevel) / 10;
    }
    set eyeLevel(v) {
        if (!Number.isInteger(v)) {
            v = (v * 10) >> 0;
        }
        this.tags.setTag(PlayerPhysicsTagIDs.eyeLevel, v);
    }
    nowIs = {
        _s: {},
        still() {
            this._s.states.movement = PlayerPhysicsStatesValues.still;
            this._s.states.secondaryMovement =
                PlayerPhysicsStatesValues.secondaryStill;
        },
        walkingForward(v = true) {
            this._s.states.movement = v
                ? PlayerPhysicsStatesValues.walkingForward
                : PlayerPhysicsStatesValues.still;
        },
        walkingBackward(v = true) {
            this._s.states.movement = v
                ? PlayerPhysicsStatesValues.walkingBackward
                : PlayerPhysicsStatesValues.still;
        },
        walkingLeft(v = true) {
            this._s.states.secondaryMovement = v
                ? PlayerPhysicsStatesValues.walkingLeft
                : PlayerPhysicsStatesValues.secondaryStill;
        },
        walkingRight(v = true) {
            this._s.states.secondaryMovement = v
                ? PlayerPhysicsStatesValues.walkingRight
                : PlayerPhysicsStatesValues.secondaryStill;
        },
        jumping(v = true) {
            this._s.states.jumping = v ? 1 : 0;
        },
        running(v = true) {
            this._s.states.running = v ? 1 : 0;
        },
    };
    is = {
        _s: {},
        get walking() {
            return this._s.states.movement || this._s.states.secondaryMovement > 1;
        },
        get running() {
            return this._s.states.running;
        },
        get onGround() {
            return this._s.states.onGround;
        },
        get inWater() {
            return this._s.states.inWater;
        },
    };
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerStatsData.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerStatsData.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerStatsData": () => (/* binding */ PlayerStatsData),
/* harmony export */   "PlayerStatsTagIDs": () => (/* binding */ PlayerStatsTagIDs),
/* harmony export */   "PlayerStatsTags": () => (/* binding */ PlayerStatsTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags/index.js */ "../../DSLIBS/divineBinaryTags/dist/index.js");

const PlayerStatsTags = new divine_binary_tags_index_js__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("player-stats-tags");
const PlayerStatsTagIDs = {
    header: "#header",
    level: "#level",
    exp: "#exp",
    maxMana: "#max_mana",
    currentMana: "#current_mana",
    maxEnegery: "#max_energy",
    currentEnergy: "#current_energy",
    speed: "#speed",
    jumpPower: "#jump_power",
    intuition: "#intuition",
};
class PlayerStatsData {
    tags = new divine_binary_tags_index_js__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("player-stairs-data");
    constructor(sab, initData) {
        this.tags.$INIT(initData);
        this.tags.setBuffer(sab);
    }
    get level() {
        return this.tags.getTag(PlayerStatsTagIDs.level);
    }
    set level(level) {
        this.tags.setTag(PlayerStatsTagIDs.level, level);
    }
    get exp() {
        return this.tags.getTag(PlayerStatsTagIDs.exp);
    }
    set exp(exp) {
        this.tags.setTag(PlayerStatsTagIDs.exp, exp);
    }
    get maxMana() {
        return this.tags.getTag(PlayerStatsTagIDs.maxMana);
    }
    set maxMana(maxMana) {
        this.tags.setTag(PlayerStatsTagIDs.maxMana, maxMana);
    }
    get currentMana() {
        return this.tags.getTag(PlayerStatsTagIDs.currentMana);
    }
    set currentMana(currentMana) {
        this.tags.setTag(PlayerStatsTagIDs.currentMana, currentMana);
    }
    get maxEnegery() {
        return this.tags.getTag(PlayerStatsTagIDs.maxEnegery);
    }
    set maxEnegery(maxEnegery) {
        this.tags.setTag(PlayerStatsTagIDs.maxEnegery, maxEnegery);
    }
    get currentEnergy() {
        return this.tags.getTag(PlayerStatsTagIDs.currentEnergy);
    }
    set currentEnergy(currentEnergy) {
        this.tags.setTag(PlayerStatsTagIDs.currentEnergy, currentEnergy);
    }
    get speed() {
        return this.tags.getTag(PlayerStatsTagIDs.speed);
    }
    set speed(speed) {
        this.tags.setTag(PlayerStatsTagIDs.speed, speed);
    }
    get jumpPower() {
        return this.tags.getTag(PlayerStatsTagIDs.jumpPower);
    }
    set jumpPower(jumpPower) {
        this.tags.setTag(PlayerStatsTagIDs.jumpPower, jumpPower);
    }
    get intuition() {
        return this.tags.getTag(PlayerStatsTagIDs.intuition);
    }
    set intuition(intuition) {
        this.tags.setTag(PlayerStatsTagIDs.intuition, intuition);
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/RegisterPlayerData.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/RegisterPlayerData.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$RegisterPlayerData": () => (/* binding */ $RegisterPlayerData)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");
/* harmony import */ var _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayerPhysicsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js");
/* harmony import */ var _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerStatsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerStatsData.js");



function $RegisterPlayerData() {
    const playerPhysicsTagManager = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.TagManager("player-physics-tags");
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.header,
        type: "header",
        numberType: "16ui",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.position,
        type: "typed-number-array",
        numberType: "64f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.pickPosition,
        type: "typed-number-array",
        numberType: "64f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.pickNormals,
        type: "typed-number-array",
        numberType: "8i",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.rotation,
        type: "typed-number-array",
        numberType: "32f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.direction,
        type: "typed-number-array",
        numberType: "32f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.sideDirection,
        type: "typed-number-array",
        numberType: "32f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.eyeLevel,
        type: "typed-number",
        numberType: "8ui",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.movement,
        type: "typed-number",
        numberType: "8ui",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.secondaryMovement,
        type: "typed-number",
        numberType: "8ui",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.jumping,
        type: "boolean",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.running,
        type: "boolean",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.onGround,
        type: "boolean",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.inWater,
        type: "boolean",
    });
    playerPhysicsTagManager.$INIT({ indexBufferMode: "shared" });
    const playerStatesTagManger = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.TagManager("player-states-tags");
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.header,
        type: "header",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.level,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.exp,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.currentMana,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.maxMana,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.currentEnergy,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.maxEnegery,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.speed,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.jumpPower,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.intuition,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.$INIT({ indexBufferMode: "shared" });
    return {
        playerPhysicsTagManager,
        playerStatesTagManger,
    };
}


/***/ })

}]);
//# sourceMappingURL=DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_dvePlugIns_Player_dist_Data_PlayerManager_-2f4e53.DVE.js.map