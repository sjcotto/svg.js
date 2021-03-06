SVG.Gradient = SVG.invent({
  // Initialize node
  create: function(type) {
    this.constructor.call(this, SVG.create(type + 'Gradient'))
    
    /* store type */
    this.type = type
  }

  // Inherit from
, inherit: SVG.Container

  // Add class methods
, extend: {
    // From position
    from: function(x, y) {
      return this.type == 'radial' ?
        this.attr({ fx: new SVG.Number(x), fy: new SVG.Number(y) }) :
        this.attr({ x1: new SVG.Number(x), y1: new SVG.Number(y) })
    }
    // To position
  , to: function(x, y) {
      return this.type == 'radial' ?
        this.attr({ cx: new SVG.Number(x), cy: new SVG.Number(y) }) :
        this.attr({ x2: new SVG.Number(x), y2: new SVG.Number(y) })
    }
    // Radius for radial gradient
  , radius: function(r) {
      return this.type == 'radial' ?
        this.attr({ r: new SVG.Number(r) }) :
        this
    }
    // Add a color stop
  , at: function(stop) {
      return this.put(new SVG.Stop().update(stop))
    }
    // Update gradient
  , update: function(block) {
      /* remove all stops */
      this.clear()
      
      /* invoke passed block */
      block(this)
      
      return this
    }
    // Return the fill id
  , fill: function() {
      return 'url(#' + this.attr('id') + ')'
    }
    // Alias string convertion to fill
  , toString: function() {
      return this.fill()
    }
  }
  
  // Add parent method
, construct: {
    // Create gradient element in defs
    gradient: function(type, block) {
      return this.defs().gradient(type, block)
    }
  }
})

SVG.extend(SVG.Defs, {
  // define gradient
  gradient: function(type, block) {
    var element = this.put(new SVG.Gradient(type))
    
    /* invoke passed block */
    block(element)
    
    return element
  }
  
})

SVG.Stop = SVG.invent({
  // Initialize node
  create: 'stop'

  // Inherit from
, inherit: SVG.Element

  // Add class methods
, extend: {
    // add color stops
    update: function(o) {
      /* set attributes */
      if (o.opacity != null) this.attr('stop-opacity', o.opacity)
      if (o.color   != null) this.attr('stop-color', o.color)
      if (o.offset  != null) this.attr('offset', new SVG.Number(o.offset))

      return this
    }
  }

})
