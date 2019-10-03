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
            return this._head.data;  //если есть начало списка, выводим его
        }
        return null
    }

    tail() {
        if (this._tail){
            return this._tail.data; //если есть конец списка, выводим его
        }
        return null
    }

    at(index) {
        let curr = this._head,
            count = 0;

        while (count < index) { //цикл перебора по индексу
            curr = curr.next;
            count++;
        }
        if (curr !== null) {
            return curr.data; //если нашли, выводим
        }
    }

    insertAt(index, data) {
        let node = this._head,
            count = 0;

        while (count < index) { //цикл поиска по индексу
            node = node.next;
            count++;
            if (count === index) {  //если на ходим значение
                node = node.prev; //берём пред значение за основное
                let nex = node.next; //добавляем в контейнер след ноду
                let new_node = new Node(data); //создаем новую ноду
                this.length++;          //прибавляем длину
                new_node.next = node.next; //изменям указатели так, чтобы вклинить в нужное положение
                new_node.prev = node;
                node.next = new_node;
                nex.prev = new_node;
            }
        }
    }

    isEmpty() {
        if (this.length) {  //возвращает false если длина меньше 0
            return false
        }
        return true
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        let curr = this._head,
            count = 0,
            pre = null,
            node = null;

        while (count < index) { //цикл поиска по индексу
            pre = curr;
            node = curr.next;
            count++;
        }

        if (curr === this._head && curr === this._tail) {
            this._head = null;
            this._tail = null;
        } else {
            pre.next = node.next;   //если находим, предыдущее значение перескакивает текущее по индексу
            node = null; //удаляем тек значение
            this.length--; //уменьшаем длину
        }
    }

    reverse() {

        let curr = this._head,
            nex = null,
            pre = null,
            last = null;

        while (curr != null) {//цикл перебора списка по очереди, пока не приведёт к концу
            nex = curr.next; //складываем след в позицию
            curr.next = pre; //след позиция получает предыдущую нынешней
            curr.pre = nex; //пред позиция получает след позицию
            pre = curr; //берём нынешнюю позицию в контейнер
            curr = nex; //нынешняя позиция теперь поменялась местами с след
        }

        last = this._tail;  //меняем конец и начало списка
        this._tail = this._head;
        this._head = last;
        return this;
    }

    indexOf(data) {

        let curr = this._head,
            count = 0;

        while (curr.data !== data) {//пока значение не будет равно требуемому продолжаем цикл
            if (count >= this.length-1){//если значение не подходит и длина больше требуемой, возвращаем -1
                return -1;
            }
            curr = curr.next;//переход к след иттерации
            count++;
        }

        return count;//если значение находим выводим индекс
    }
}

module.exports = LinkedList;

