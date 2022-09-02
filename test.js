const { derivative, intersect } = require("mathjs");
const { integrate } = require("nerdamer");
var Algebrite = require('algebrite')
//console.log(derivative("2x^3", "x").toString())
console.log(Algebrite.eval('integral(x*sqrt(x^2+1))').toString())