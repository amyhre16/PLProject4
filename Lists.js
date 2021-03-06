/**
 * Created by Anthony on 3/21/2016.
 */

"use strict";

var list = function() {         // this is referred to outside of the function
    var list = function () {    // it's really a function application b/c it has the two parentheses at the end...this list name is what's referred inside of the list function
        function Node(data) {
            this.data = data;
            this.next = null;
        }

        var l = {
            length: 0,
            currentNode: null,
            head: new Node(null),
            add: function(e) {      /* function that checks to see if current node is going to be null  */
                if (l.currentNode === null) {   /* this is true the first time  */
                    l.head.data = e;
                    l.currentNode = new Node(null);
                    l.head.next = l.currentNode;
                    l.length++;
                }
                else {              /* every other time, current node will not be null */
                    l.currentNode.data = e;
                    var node = new Node(null);
                    l.currentNode.next = node;
                    l.currentNode = node;
                    l.length++;
                }
            },
        };

        var F = function () {
        };
        var f = new F();    /* creating new object, not specifying prototype so it's not going to inherit anything */

        /*public data           defining the methods here (all of these methods are visible outside of the function these methods can see inside of the closure)*/
        f.run = function (e) {
            return l[e];
        };
        f.first = f.car = function () {     // can be called by either first or by car
            return l.head.data
        }
        f.rest = f.cdr = function () {      // can be called by either rest or cdr
            if(l.length > 0) {
                l.head = l.head.next;
                l.length--;
            }
            return this;
        }
        f.concat = f.cons = function(e){
            if (typeof e === 'string' || e instanceof String) {l.add(e);}       /* copies the nodes of the argument over to the object that calls this method */
            else {
                var n = e.run('head')
                for(var i = 0; i < e.run('length'); i++) {
                    l.add(n.data);
                    n = n.next;
                }
            }
        }
        f.length = function(){return l.length}

        f.map = function(func) {
            if (func instanceof Function) {
                var n = l.head;
                for (var i = 0; i < l.length; i++) {
                    n.data = func(n.data);                 // passing n.data into the function that's passed into f.map
                    n = n.next;                         // set n to be next
                }
            }
        }
        // Iterator method
        f.iterate = (function () {
            var iNode = null;
            return function () {
                if (iNode == null) {
                    iNode = l.head;
                } else {
                    iNode = iNode.next;
                }
                return iNode.data;
            }
        })();

        return f;
    }();        // end of the function application
    return list;
};

var l1 = new list();
var l2 = new list();
l1.cons('x')
l1.cons('y')
l1.cons('z')
l2.cons(l1);

document.writeln("<BR>original list: " + l1.car());
while(l1.length() > 1) {
    document.writeln(", " + l1.cdr().car());    // cdr gives you the entire list w/o the first element
}

document.writeln("<BR><BR>Iterate Through List<BR>");
document.writeln("First Method Call: " + l2.iterate());
document.writeln("<BR>Second Method Call: " + l2.iterate());
document.writeln("<BR>Third Method Call: " + l2.iterate());