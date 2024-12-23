const classmates = {
    1: {
        id: 1,
        name: 'John',
        gender: 'male',
        friends: [2, 3, 4]
    },
    2: {
        id: 2,
        name: 'Jane',
        gender: 'female',
        friends: [1, 3, 4]
    },
    3: {
        id: 3,
        name: 'Peter',
        gender: 'male',
        friends: [1, 2, 5]
    },
    4: {
        id: 4,
        name: 'Mary',
        gender: 'female',
        friends: [2, 1, 5]
    },
    5: {
        id: 5,
        name: 'Paul',
        gender: 'male',
        friends: [3, 4]
    }
};

// Function to get a vertex by id
const getVertex = (personList, vertexId) => Object.values(personList).find(item => item.id === vertexId)

const res = getVertex(classmates, 3)

const mariaFriends = res.friends.map(friendId => getVertex(classmates, friendId))

console.log(`Friends of ${res.name}:`, mariaFriends)

// Class Graph
class Graph {
    constructor(adjacencyList) {
        this.adjacencyList = adjacencyList || {};
        this.nameIndex = {};
        Object.values(this.adjacencyList).forEach((vertex) => {
            this.nameIndex[vertex.name.toLowerCase()] = vertex.id;
        });
    }

    getList() {
        return this.adjacencyList;
    }

    addVertex(vertex) {
        const vertexId = vertex.id || crypto.randomUUID();
        this.adjacencyList[vertexId] = {...vertex, id: vertexId};
        this.nameIndex[vertex.name.toLowerCase()] = vertexId;
    }


    getVertexByName(name) {
        const vertexId = this.nameIndex[name.toLowerCase()];
        console.log(vertexId)
        return vertexId ? this.adjacencyList[vertexId] : null;
    }

    addFriend(vertex1Id, vertex2Id) {
        if (!this.adjacencyList[vertex1Id] || !this.adjacencyList[vertex2Id]) {
            throw new Error('One or both vertices not found');
        }
        this.adjacencyList[vertex1Id].friends.push(vertex2Id);
        this.adjacencyList[vertex2Id].friends.push(vertex1Id);
    }

    addEdge(vertex1Id, vertex2Id) {
        if (!this.adjacencyList[vertex1Id] || !this.adjacencyList[vertex2Id]) {
            throw new Error('Vertex not found');
        }

        if (!this.adjacencyList[vertex1Id].friends.includes(vertex2Id)) {
            this.addFriend(vertex1Id, vertex2Id)
        }

    }
}

const classmatesGraph = new Graph(classmates)

const graphList = classmatesGraph.getList()

classmatesGraph.addVertex(
    {
        name: 'Julia',
        gender: 'female',
        friends: []
    })
classmatesGraph.addVertex(
    {
        name: 'Alex',
        gender: 'male',
        friends: []
    })

classmatesGraph.addEdge(classmatesGraph.getVertexByName('Julia').id, classmatesGraph.getVertexByName('Alex').id)

console.log(graphList)
