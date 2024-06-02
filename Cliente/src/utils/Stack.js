export class Stack {
	constructor(array, top) {
		this.stack = array;
		this.top = top;
	}

	isEmpty() {
		return this.top === -1;
	}

	push(item) {
		this.stack[++this.top] = item;
	}

	pop() {
		if (!this.isEmpty()) {
			return this.stack[this.top--];
		} else {
			alert("Não há ações para desfazer!");
		}
	}

	peek() {
		return this.stack[this.top];
	}

	getTop() {
		return this.top;
	}

	getStack() {
		return this.stack;
	}
}
