var expect = chai.expect;

describe("Tests", function() {
  describe("sayHello", function() {
    it("should say hello", function() {
      var bonitaLib = new BonitaLib();
      expect(bonitaLib.sayHello("Fabrice")).to.equal("Hello : Fabrice");
    });
  });
});
