describe("Gilded Rose,", function() {

  describe("a product", function() {

    it("has a name", function() {
      var name = "Crafted beer";
      var items = [ new Item(name, 0, 0) ];
      update_quality();
      expect(items[0].name).toEqual(name);
    });

    it("has a SellIn value", function() {
      var sellInValue = 10;
      var items = [ new Item("", sellInValue, 0) ];
      update_quality();
      expect(items[0].sell_in).toEqual(sellInValue);
    });
  });
});
