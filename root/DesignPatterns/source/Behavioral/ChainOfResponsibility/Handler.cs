public abstract record Handler
{
    protected Handler Next;

    public Handler SetNext(Handler next) => Next = next;

    public abstract void Handle(object request);
}
