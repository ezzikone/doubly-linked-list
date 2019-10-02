const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);

        if (this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }

        this.length++;

        return node;
    }

    head() {
        if (this._head) {
            return this._head.data;
        }
        return null
    }

    tail() {
        if (this._tail){
            return this._tail.data;
        }
        return null
    }

    at(index) {
        let currentNode = this._head,
            count = 0;

        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode.data;
    }

    insertAt(index, data) {
        let node = this._head,
            count = 0;

        while (count < index) {
            node = node.next;
            count++;
            if (count === index) {
                node = node.prev;
                let nex = node.next;
                let new_node = new Node(data);
                this.length++;
                new_node.next = node.next;
                new_node.prev = node;
                node.next = new_node;
                nex.prev = new_node;
            }
        }
    }

    isEmpty() {
        if (this.length) {
            return false
        }
        return true
    }

    clear() {
        let node = this._head;

        while (this.length > 0) {
            if (this.length < 2 ) {
                node.prev = null;
                this._head = null;
                this._tail = null;
                this.length--;
                return
            }
            node.next = null;
            this.length--;
        }
    }

    deleteAt(index) {
        let currentNode = this._head,
            count = 0,
            before = null,
            node = null,
            deleted;

        while (count < index) {
            before = currentNode;
            node = currentNode.next;
            count++;
        }

        before.next = node.next;
        deleted = node;
        node = null;
        this.length--;

        return deleted;
    }

    reverse() {
        let node = this._head,
            count = 0,
            mass = [node.data];

        while (count < this.length-1) {
            node = node.next;
            mass.push(node.data);
            count++;
        }

        let rev = mass.reverse();

        list.clear();

        while (mass.length > 0) {
            let node = new Node(rev.shift());

            if (this.length) {
                this._tail.next = node;
                node.prev = this._tail;
                this._tail = node;
            } else {
                this._head = node;
                this._tail = node;
            }
            this.length++;
        }

    }

    indexOf(data) {
        let currentNode = this._head,
            count = 0;

        while (currentNode.data !== data) {
            if (count >= this.length-1){
                return -1;
            }
            currentNode = currentNode.next;
            count++;
        }

        return count;
    }
}

module.exports = LinkedList;

const list = new LinkedList();
//
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.append(6);

list.reverse();
//

console.log(list.head());//6
console.log(list.tail());//1
console.log(list.at(1));//5
console.log(list.at(2));//4
console.log(list.at(3));//3
console.log(list.at(4));//2
console.log(list.length);