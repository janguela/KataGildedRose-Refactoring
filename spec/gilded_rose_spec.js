describe("Gilded Rose,", function() {

  describe("a product", function() {

    it("has a name", function() {
      var name = "Crafted beer";
        items = [ new Item(name, 0, 0) ];
      update_quality();
      expect(items[0].name).toEqual(name);
    });
  });
});
