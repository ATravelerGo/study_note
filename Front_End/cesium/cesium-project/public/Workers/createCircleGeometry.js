/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.125
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as l}from "cesium/Build/Cesium/Workers/chunk-YGBGLFI5.js";import"cesium/Build/Cesium/Workers/chunk-FAPED76U.js";import"cesium/Build/Cesium/Workers/chunk-4MYAYFOP.js";import"cesium/Build/Cesium/Workers/chunk-FG3CL3AH.js";import"cesium/Build/Cesium/Workers/chunk-VMXXQ6B4.js";import"cesium/Build/Cesium/Workers/chunk-XCRMBS5M.js";import"cesium/Build/Cesium/Workers/chunk-N5SNKJ43.js";import{a as m}from "cesium/Build/Cesium/Workers/chunk-6VK5R74O.js";import"cesium/Build/Cesium/Workers/chunk-V7XARCCV.js";import"cesium/Build/Cesium/Workers/chunk-SACP225T.js";import"cesium/Build/Cesium/Workers/chunk-YFQNY2YN.js";import"cesium/Build/Cesium/Workers/chunk-NT26NNVH.js";import"cesium/Build/Cesium/Workers/chunk-NW2YE576.js";import"cesium/Build/Cesium/Workers/chunk-2NIQ5ECB.js";import"cesium/Build/Cesium/Workers/chunk-7YEOLR2L.js";import"cesium/Build/Cesium/Workers/chunk-QHHYYTCM.js";import{a,d as s}from "cesium/Build/Cesium/Workers/chunk-RH3GFHG2.js";import"cesium/Build/Cesium/Workers/chunk-FRWNWNYJ.js";import"cesium/Build/Cesium/Workers/chunk-UKWFHLUK.js";import"cesium/Build/Cesium/Workers/chunk-UAWOHN7R.js";import{a as c}from "cesium/Build/Cesium/Workers/chunk-TA3RE4KQ.js";import{b as p}from "cesium/Build/Cesium/Workers/chunk-RTY3VPG6.js";import{e as d}from "cesium/Build/Cesium/Workers/chunk-LRNH5AEO.js";function n(e){e=c(e,c.EMPTY_OBJECT);let r=e.radius;p.typeOf.number("radius",r);let o={center:e.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new l(o),this._workerName="createCircleGeometry"}n.packedLength=l.packedLength;n.pack=function(e, r, o){return p.typeOf.object("value",e),l.pack(e._ellipseGeometry,r,o)};var f=new l({center:new a,semiMajorAxis:1,semiMinorAxis:1}),t={center:new a,radius:void 0,ellipsoid:s.clone(s.default),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new m,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};n.unpack=function(e, r, o){let i=l.unpack(e,r,f);return t.center=a.clone(i._center,t.center),t.ellipsoid=s.clone(i._ellipsoid,t.ellipsoid),t.ellipsoid=s.clone(i._ellipsoid,f._ellipsoid),t.height=i._height,t.extrudedHeight=i._extrudedHeight,t.granularity=i._granularity,t.vertexFormat=m.clone(i._vertexFormat,t.vertexFormat),t.stRotation=i._stRotation,t.shadowVolume=i._shadowVolume,d(o)?(t.semiMajorAxis=i._semiMajorAxis,t.semiMinorAxis=i._semiMinorAxis,o._ellipseGeometry=new l(t),o):(t.radius=i._semiMajorAxis,new n(t))};n.createGeometry=function(e){return l.createGeometry(e._ellipseGeometry)};n.createShadowVolume=function(e, r, o){let i=e._ellipseGeometry._granularity,u=e._ellipseGeometry._ellipsoid,h=r(i,u),x=o(i,u);return new n({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:u,stRotation:e._ellipseGeometry._stRotation,granularity:i,extrudedHeight:h,height:x,vertexFormat:m.POSITION_ONLY,shadowVolume:!0})};Object.defineProperties(n.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}});var _=n;function g(e, r){return d(r)&&(e=_.unpack(e,r)),e._ellipseGeometry._center=a.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=s.clone(e._ellipseGeometry._ellipsoid),_.createGeometry(e)}var H=g;export{H as default};
