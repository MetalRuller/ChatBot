const Class = require('./Class');

module.exports = Class.extend({
    dependencyGraph: {},
    dependencies: {},
    init: function(dependencyGraph) {
        this.dependencies = dependencyGraph;

        for(let dependency in this.dependencies) {
            if (!this.dependencies.hasOwnProperty(dependency)) continue;
            if (!this.dependencyGraph.hasOwnProperty(dependency)) {
                throw "Failed to locate dependency: " + dependency;
            }
            this[this.dependencies[dependency]] = this.dependencyGraph[dependency];
        }
    }
});