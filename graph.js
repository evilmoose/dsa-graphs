class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // other methods...

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node of this.nodes) {
      node.adjacent.delete(vertex);
    }
  }

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
      if (!node) return;
      visited.add(node);
      result.push(node.value);
      node.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    }

    dfs(start);
    return result;
  }

  breadthFirstSearch(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    while (queue.length) {
      const node = queue.shift();
      if (!visited.has(node)) {
        visited.add(node);
        result.push(node.value);
        node.adjacent.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
    }
    return result;
  }
}

module.exports = {Graph, Node}