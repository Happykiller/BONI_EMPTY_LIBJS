var expect = chai.expect;

describe("Tests", function() {
  describe("sayHello", function() {
    it("should say hello", function() {
      var bonitaLib = new BonitaLib();
      expect(bonitaLib.sayHello("Fabrice")).to.equal("Hello : Fabrice");
    });
  })
  describe("mergeRecursive", function() {
    it("merge simple", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : 1,
        b : 2,
        c : {
          ca : 1,
          cb : null,
          cc : {
            cca : 100,
            ccb : 200
          }
        },
        d : null
      };

      var objInput = {
        a : 10,
        c : {
          ca : 10,
          cc : {
            cca : 101,
            ccb : 202
          }
        },
        d : 42
      };

      var expected = {
        a : 10,
        b : 2,
        c : {
          ca : 10,
          cb : null,
          cc : {
            cca : 101,
            ccb : 202
          }
        },
        d : 42
      };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      console.log(objReturn);

      expect(objReturn).to.deep.equal(expected);
    });
    it("merge array", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : [
          {
            a : "",
            b : ""
          }
        ],
        b : [],
        c : [
          {
            a : "",
            b : [
              {
                a : "",
                b : "",
              }
            ]
          }
        ]
      };

      var objInput = {
        a : [
          {
            a : "",
            b : ""
          },
          {
            a : "fba"
          }
        ],
        c : [
          {
            a : "",
            b : [
              {
                b : "hbb"
              }
            ]
          }
        ]
      };

      var expected = {
        a : [
          {
            a : "",
            b : ""
          },
          {
            a : "fba",
            b : ""
          }
        ],
        b : [],
        c : [
          {
            a : "",
            b : [
              {
                a : "",
                b : "hbb"
              }
            ]
          }
        ]
      };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      console.log(objReturn);

      expect(objReturn).to.deep.equal(expected);
    });
  });
});
