using System;
using System.Collections.Generic;

var context = new Context();

var expressions = new List<AbstractExpression>
{
    new TerminalExpression(),
    new NonTerminalExpression(),
    new TerminalExpression(),
    new TerminalExpression(),
    new NonTerminalExpression()
};

expressions.ForEach(expression => expression.Interpret(context));

Console.ReadKey();
