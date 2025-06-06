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

import{a as m}from "cesium/Build/Cesium/Workers/chunk-6VK5R74O.js";import{a as b}from "cesium/Build/Cesium/Workers/chunk-NT26NNVH.js";import{b as v,c as x,d as p}from "cesium/Build/Cesium/Workers/chunk-NW2YE576.js";import{d as A}from "cesium/Build/Cesium/Workers/chunk-2NIQ5ECB.js";import"cesium/Build/Cesium/Workers/chunk-7YEOLR2L.js";import{a as c}from "cesium/Build/Cesium/Workers/chunk-QHHYYTCM.js";import{a as y}from "cesium/Build/Cesium/Workers/chunk-RH3GFHG2.js";import"cesium/Build/Cesium/Workers/chunk-FRWNWNYJ.js";import"cesium/Build/Cesium/Workers/chunk-UKWFHLUK.js";import"cesium/Build/Cesium/Workers/chunk-UAWOHN7R.js";import{a as i}from "cesium/Build/Cesium/Workers/chunk-TA3RE4KQ.js";import{b as u}from "cesium/Build/Cesium/Workers/chunk-RTY3VPG6.js";import{e as f}from "cesium/Build/Cesium/Workers/chunk-LRNH5AEO.js";function s(r){r=i(r,i.EMPTY_OBJECT);let e=i(r.vertexFormat,m.DEFAULT);this._vertexFormat=e,this._workerName="createPlaneGeometry"}s.packedLength=m.packedLength;s.pack=function(r, e, o){return u.typeOf.object("value",r),u.defined("array",e),o=i(o,0),m.pack(r._vertexFormat,e,o),e};var d=new m,P={vertexFormat:d};s.unpack=function(r, e, o){u.defined("array",r),e=i(e,0);let a=m.unpack(r,e,d);return f(o)?(o._vertexFormat=m.clone(a,o._vertexFormat),o):new s(P)};var F=new y(-.5,-.5,0),l=new y(.5,.5,0);s.createGeometry=function(r){let e=r._vertexFormat,o=new b,a,n;if(e.position){if(n=new Float64Array(4*3),n[0]=F.x,n[1]=F.y,n[2]=0,n[3]=l.x,n[4]=F.y,n[5]=0,n[6]=l.x,n[7]=l.y,n[8]=0,n[9]=F.x,n[10]=l.y,n[11]=0,o.position=new p({componentDatatype:c.DOUBLE,componentsPerAttribute:3,values:n}),e.normal){let t=new Float32Array(12);t[0]=0,t[1]=0,t[2]=1,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=1,t[9]=0,t[10]=0,t[11]=1,o.normal=new p({componentDatatype:c.FLOAT,componentsPerAttribute:3,values:t})}if(e.st){let t=new Float32Array(8);t[0]=0,t[1]=0,t[2]=1,t[3]=0,t[4]=1,t[5]=1,t[6]=0,t[7]=1,o.st=new p({componentDatatype:c.FLOAT,componentsPerAttribute:2,values:t})}if(e.tangent){let t=new Float32Array(12);t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t[6]=1,t[7]=0,t[8]=0,t[9]=1,t[10]=0,t[11]=0,o.tangent=new p({componentDatatype:c.FLOAT,componentsPerAttribute:3,values:t})}if(e.bitangent){let t=new Float32Array(12);t[0]=0,t[1]=1,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=1,t[8]=0,t[9]=0,t[10]=1,t[11]=0,o.bitangent=new p({componentDatatype:c.FLOAT,componentsPerAttribute:3,values:t})}a=new Uint16Array(2*3),a[0]=0,a[1]=1,a[2]=2,a[3]=0,a[4]=2,a[5]=3}return new x({attributes:o,indices:a,primitiveType:v.TRIANGLES,boundingSphere:new A(y.ZERO,Math.sqrt(2))})};var w=s;function h(r, e){return f(e)&&(r=w.unpack(r,e)),w.createGeometry(r)}var M=h;export{M as default};
