describe('Our first tests', function() {
    it('should work', function () {
        expect(true).toEqual(true);
    })

    it('compares two numbers', function() {
        expect([1,2,3]).toEqual([1,2,3])
    })

    it('should compare with deep equality', function() {
        expect({foo:5}).toEqual({ foo: 5 })
    })

    it('should support spies', function() {
        const spy = jest.fn();
        spy()
        spy()
        expect(spy).toHaveBeenCalledTimes(2)
        spy('foo')
        expect(spy).toBeCalledWith('foo')
    })

    it('should be a string', function() {
        expect(typeof 'foo' === 'string').toBeTruthy()
    })
})