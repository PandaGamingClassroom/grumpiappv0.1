//============================================================================
// Quasi Movement
// Version: 1.196
// Last Update: January 12, 2016
//============================================================================
// ** Terms of Use
// http://quasixi.com/mv/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// Downloading from Github
//  - Click on Raw next to Blame and History
//  - Once new page loads, right click and save as
//============================================================================
// How to install:
//  - Save this file as "QuasiMovement.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - If using YEP_CoreEngine, place this somewhere below it!
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/mv/movement/
//  - - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
//============================================================================

var Imported = Imported || {};
Imported.Quasi_Movement = 1.196;

//=============================================================================
 /*:
 * @plugindesc Change the way movement works.
 * @author Quasi       Site: http://quasixi.com
 *
 * @param Grid
 * @desc The amount of pixels you want to move per movement.
 * Script Default: 1   MV Default: 48
 * @default 1
 *
 * @param Off Grid
 * @desc Allow characters to move faster then the set GRID?
 * Set to true or false
 * @default true
 *
 * @param Tile Size
 * @desc Adjust the size of tile boxes.
 * Script Default: 48
 * @default 48
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Smart Move
 * @desc If the move didn't succeed try again at lower speeds.
 * 0 - Disabled  1 - Speed  2 - Dir  3 - Speed & Dir
 * @default 0
 *
 * @param Old Smart Move Dir
 * @desc Use old smart move dir. New one doesn't work for followers.
 * Set to true or false
 * @default false
 *
 * @param Mid Pass
 * @desc An extra collision check for the midpoint of the movement.
 * Set to true or false
 * @default false
 *
 * @param Move On Click
 * @desc Set if the player should move with mouse clicks.
 * Default: true
 * @default true
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Diagonal
 * @desc Allow for diagonal movement?
 * Set to true or false
 * @default true
 *
 * @param Diagonal Speed
 * @desc Adjust the speed when moving diagonal.
 * Default: 0
 * @default 0
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Collision
 * @desc The color for collisions in the collision map.
 * default: #ff0000 (red)
 * @default #ff0000
 *
 * @param Water Collision
 * @desc Color for water collisions (Boats and Ships can move on).
 * default: #00ff00
 * @default #00ff00
 *
 * @param Deep Water Collision
 * @desc Color for deep water collisions (Only Ships can move on).
 * default: #0000ff
 * @default #0000ff
 *
 * @param Water Terrain Tag
 * @desc Set the terrain tag for water tiles.
 * default: 1
 * @default 1
 *
 * @param Deep Water Terrain Tag
 * @desc Set the terrain tag for deep water tiles.
 * default: 2
 * @default 2
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Player Box
 * @desc Default player box. (width, height, ox, oy)
 * default: 36, 24, 6, 24
 * @default 36, 24, 6, 24
 *
 * @param Event Box
 * @desc Default event box. (width, height, ox, oy)
 * default: 36, 24, 6, 24
 * @default 36, 24, 6, 24
 *
 * @param Boat Box
 * @desc Default boat box. (width, height, ox, oy)
 * default: 36, 24, 6, 12
 * @default 36, 24, 6, 12
 *
 * @param Ship Box
 * @desc Default ship box. (width, height, ox, oy)
 * default: 36, 24, 6, 24
 * @default 36, 24, 6, 24
 *
 * @param Airship Box
 * @desc Default airship box. (width, height, ox, oy)
 * default: 36, 36, 6, 6     (Only used for landing)
 * @default 36, 36, 6, 6
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param JSON folder
 * @desc Where to store JSON files.
 * Default: data/
 * @default data/
 *
 * @param Collision Map folder
 * @desc Where to store Collision Map images.
 * Default: img/parallaxes/
 * @default img/parallaxes/
 *
 * @param Region Map folder
 * @desc Where to store Region Map images.
 * Default: img/parallaxes/
 * @default img/parallaxes/
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Use Regions Boxes
 * @desc Set to true if you want to put Box Colliders on regions.
 * default: false
 * @default false
 *
 * @param Show Boxes
 * @desc Show the Box Colliders by default during testing.
 * Set to true or false      - Toggle on/off with F10 during play test
 * @default true
 *
 * @help
 * =============================================================================
 * ** Setting up Colliders
 * =============================================================================
 * The following are placed inside Player Notes or as a Comment inside the
 * event. Event box is based off it's current page. So Event can have a
 * different box depending on its page.
 *   Single Collider <Note Tag>
 *       <collider=type,width,height,ox,oy>
 *
 *   Different collider based on direction <Comment>
 *       <collider>
 *       5: type, width, height, ox, oy
 *       X: type, width, height, ox, oy
 *       </collider>
 *     Where 5 is the default box if a box isn't set for a direction. And X is
 *     the box for that direction. Direction can be 2, 4, 6 or 8.
 *     Type can be box or circle
 *     * Resets on page change
 *
 *   A good circle collider for 48x48 sprites:
 *       <collider=circle,36,24,6,24>
 *
 *   Setting default OX and OY values for events <Comment>
 *       <ox=X>
 *         or
 *       <oy=Y>
 *     Set X or Y to the values you want. Can be negative.
 *     * Resets on page change
 * =============================================================================
 * ** Setting up Region Boxes
 * =============================================================================
 * To use region boxes, you first have to enabled "Use Region Boxes" in
 * the plugin settings. Next you need to create a json file called
 * "RegionBoxes.json" inside the folder you set for JSON folder parameter.
 *   If you do not know how to create a .json file download my sample
 *   RegionBoxes.json file:
 *       https://gist.github.com/quasixi/ff149320fd6885191d87
 *
 *   JSON template <JSON>
 *       {
 *         "REGION ID 1": [
 *                     {"width": w, "height": h, "ox": ox value, "oy": oy value, "tag": "some text"}
 *                        ],
 *         "REGION ID 2": [
 *                     {"width": w, "height": h, "ox": value, "oy": value},
 *                     {"width": w, "height": h, "ox": value, "oy": value}
 *                        ]
 *       }
 *     "REGION ID 2" is an example of a region with 2 boxes
 *     Replace REGION ID with the actual number for the region, but keep it
 *     inside the quotes! Becareful with the commas ( , ) place them
 *     after } or ] only if it's not the last one in the list!
 *
 *     The tag field will act like notetags for regions. This will allow me to
 *     treat regions differently depending on the tag if needed.
 *
 *     Few tags:
 *         <counter>
 *         <bush>
 *         <ladder>
 *         <damage>
 *     * You can use more then one tag, just keep it inside the "" quotes!
 *       Ex:  "<bush><damage>"
 * =============================================================================
 * ** Setting up Collision Maps
 * =============================================================================
 * Allows the use of an image with collisions. Using this you can setup a
 * pseudo perfect pixel collision.
 *   Add a Collision Map <Note Tag>
 *       <cm=filename>
 *     Replace filename with the name of the collision map you want to load.
 *     Don't add the extension, and file should be location in the folder you
 *     set in the Collision Map folder parameter.
 *     * Map note tags are found in the map properties
 *
 *   Add a Region Map <Note Tag>
 *       <rm=filename>
 *     Replace filename with the name of the region map you want to load.
 *     Don't add the extension, and file should be location in the folder you
 *     set in the Region Map folder parameter.
 *     * Region maps do not effect collisions at all!
 * =============================================================================
 * ** Passability Levels
 * =============================================================================
 * Passability levels are a new feature which sets weither a character can
 * walk over water or deep water tiles.
 *   Levels:
 *       0 - Default, Can only move on passable tiles
 *       1 - Boat, Can only move on water 1 tiles
 *       2 - Ship, Can only move on water 1 and water 2 tiles
 *       3 - NEW, Can move on passable tiles and water 1 tiles
 *       4 - NEW, Can move on passable tiles, water 1 and water 2 tiles
 *
 *   Get Characters Passability Level <Script call>
 *       $gamePlayer.passabilityLevel();
 *          or
 *       $gameMap.event(ID).passabilityLevel();
 *
 *   Change Player Passability Level <Script call>
 *       $gamePlayer.setPassability(X);
 *     Set x to the level you want to set it to.
 *
 *   Change Event Passability Level <Script call>
 *       $gameMap.event(ID).setPassability(X);
 *     Set ID to the event ID and X to the level you want to set it to.
 *
 *   Set Event default Passability Level <Comment>
 *       <pl=X>
 *     Set X to the level you want to set it to.
 *     * Resets on page change.
 * =============================================================================
 * ** Script Calls
 * =============================================================================
 * The following are to be placed inside "Script..." commands
 *
 * Script calls for Move Routes:
 *   Q Move - Moves the character X amount of distance, ignores Off Grid setting
 *       qmove(direction, amount, multiplicity)
 *     direction    - which direction the movement should be
 *     amount       - how many times should the player move
 *     multiplicity - multiplies amount for easier calculations
 *
 *   M Move - Moves the character X amount of distance, stays on Grid.
 *       mmove(direction, amount, multiplicity)
 *     same definitions as qmove()
 *
 * Other script calls:
 *   Change a characters collider
 *       $gamePlayer.changeCollider(type, width, height, ox, oy)
 *         or
 *       $gameMap.event(eventId).changeCollider(type, width, height, ox, oy)
 *     Type should be a string ( wrapped in quotes "")
 *     - Type can be "box" or "circle"
 *     width, height, ox and oy are numbers, no quotes
 *
 *   Get color from region map.
 *       $gameMap.getPixelRegion(x, y)
 *     x and y default to players center location.
 *     return value is a string of the hex color.
 *
 *   Get tile flags
 *       $gameMap.flagAt(x, y)
 *     x and y default to players x and y
 *     works best when grid is equal to tile size.
 *     the results are logged in the console.
 *
 *   Pixel based jump
 *       $gamePlayer.pixelJump(distanceX, distanceY)
 *         or
 *       $gameMap.event(ID).pixelJump(distanceX, distanceY)
 *
 *   Jump Forward
 *       $gamePlayer.jumpForward(direction)
 *         or
 *       $gameMap.event(ID).jumpForward(direction)
 *     Jumps 1 tile size forward
 *     Direction defaults to the characters direction so it can be left out.
 *
 *   Change Collision Map / Region Map
 *       $gameMap.loadCollisionmap(file)
 *         or
 *       $gameMap.loadRegionmap(file)
 *     File: Set to the new collison / region map you want to load.
 *     * Will replace current one.
 *
 *   Create a collider
 *       var myBoxCollider = new QuasiMovement.Box_Collider(w, h, ox, oy, shiftY);
 *         or
 *       var myCircleCollider = new QuasiMovement.Circle_Collider(w, h, ox, oy, shiftY);
 *
 *   Moving a custom collider
 *       myCollider.moveto(x, y);
 *     Set X and Y in pixel terms.
 *     Also use the correct variable that you used to make the collider.
 *
 *   Showing Custom collider on map
 *       SceneManager._scene.addTempCollider(collider, duration)
 *     (Only works if you're in Scene_Map!)
 *     Set collider to the collider object
 *     Set duration to the duration it'll display
 *
 *   Get characters that overlap with a collider
 *       $gameMap.getCharactersAt(collider, ignore)
 *     Collider needs to be a Collider object
 *     Ignore is a function
 *     > Returns an Array of characters it overlays.
 *      - Can leave ignore function undefined if you want to manually filter
 *     ( Search this script for an example usage if needed )
 *
 *   Get map tiles that overlap with collider
 *       $gameMap.getTileBoxesAt(collider, ignore)
 *     Collider needs to be a Collider object
 *     Ignore is a function
 *     > Returns an Array of tilesboxes it overlays
 *      - Can leave ignore function undefined if you want to manually filter
 *     ( Search this script for an example usage if needed )
 *
 *
 * =Special thanks to Archeia===================================================
 * Links
 *  - http://quasixi.com/mv/movement/
 *  - https://github.com/quasixi/RPG-Maker-MV
 *  - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
 */
//=============================================================================

//-----------------------------------------------------------------------------
// New Classes

function Sprite_Collider() {
  this.initialize.apply(this, arguments);
}

//-----------------------------------------------------------------------------
// Quasi Movement

var QuasiMovement = (function() {
  var Movement = {};
  Movement.proccessParameters = function() {
    var parameters   = PluginManager.parameters('QuasiMovement');
    this.grid        = Number(parameters['Grid'] || 1);
    this.offGrid     = parameters['Off Grid'].toLowerCase() === 'true';
    this.tileSize    = Number(parameters['Tile Size'] || 48);
    this.smartMove   = Number(parameters['Smart Move'] || 0);
    this.oldSmartDir = parameters['Old Smart Move Dir'].toLowerCase() === 'true';
    this.midPass     = parameters['Mid Pass'].toLowerCase() === 'true';
    this.moveOnClick = parameters['Move On Click'].toLowerCase() === 'true';
    this.diagonal    = parameters['Diagonal'].toLowerCase() === 'true';
    this.diagSpeed   = Number(parameters['Diagonal Speed'] || 0);
    this.collision   = parameters['Collision'];
    this.water1      = parameters['Water Collision'];
    this.water2      = parameters['Deep Water Collision'];
    this.water1Tag   = Number(parameters['Water Terrain Tag'] || 1);
    this.water2Tag   = Number(parameters['Deep Water Terrain Tag'] || 2);
    this.playerBox   = this.stringToAry(parameters['Player Box']);
    this.eventBox    = this.stringToAry(parameters['Event Box']);
    this.boatBox     = this.stringToAry(parameters['Boat Box']);
    this.shipBox     = this.stringToAry(parameters['Ship Box']);
    this.airshipBox  = this.stringToAry(parameters['Airship Box']);
    this.jFolder     = parameters['JSON folder'];
    this.rmFolder    = parameters['Region Map folder'];
    this.cmFolder    = parameters['Collision Map folder'];
    this.useRegions  = parameters['Use Regions Boxes'].toLowerCase() === 'true';
    this.showBoxes   = parameters['Show Boxes'].toLowerCase() === 'true';
    this.tileBoxes   = {
      1537: [48, 6, 0, 42],
      1538: [6, 48],
      1539: [[48, 6, 0, 42], [6, 48]],
      1540: [6, 48, 42],
      1541: [[48, 6, 0, 42], [6, 48, 42]],
      1542: [[6, 48], [6, 48, 42]],
      1543: [[48, 6, 0, 42], [6, 48], [6, 48, 42]],
      1544: [48, 6],
      1545: [[48, 6], [48, 6, 0, 42]],
      1546: [[48, 6], [6, 48]],
      1547: [[48, 6], [48, 6, 0, 42], [6, 48]],
      1548: [[48, 6], [6, 48, 42]],
      1549: [[48, 6], [48, 6, 0, 42], [6, 48, 42]],
      1550: [[48, 6], [6, 48], [6, 48, 42]],
      1551: [48, 48], // Impassable A5, B
      2063: [48, 48], // Impassable A1
      2575: [48, 48],
      3586: [6, 48],
      3588: [6, 48, 42],
      3590: [[6, 48], [6, 48, 42]],
      3592: [48, 6],
      3594: [[48, 6], [6, 48]],
      3596: [[48, 6], [6, 48, 42]],
      3598: [[48, 6], [6, 48], [6, 48, 42]],
      3599: [48, 48],  // Impassable A2, A3, A4
      3727: [48, 48]
    };
    this.regionBoxes = {};
    if (this.useRegions) this.loadRegionBoxes();
    var size = this.tileSize / 48;
    for (var key in this.tileBoxes) {
      if (this.tileBoxes.hasOwnProperty(key)) {
        for (var i = 0; i < this.tileBoxes[key].length; i++) {
          if (this.tileBoxes[key][i].constructor === Array) {
            for (var j = 0; j < this.tileBoxes[key][i].length; j++) {
              this.tileBoxes[key][i][j] *= size;
            }
          } else {
            this.tileBoxes[key][i] *= size;
          }
        }
      }
    }
  };

  Movement.loadRegionBoxes = function() {
    var xhr = new XMLHttpRequest();
    var url = this.jFolder + 'RegionBoxes.json';
    xhr.open('GET', url, true);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      if (xhr.status < 400) {
        Movement.regionBoxes = JSON.parse(xhr.responseText);
      }
    };
    xhr.send();
  };

  Movement.stringToAry = function(string, keepWhiteSpace) {
    var ary = string.split(',');
    ary = ary.map(function(s) {
      if (!keepWhiteSpace) s = s.replace(/\s+/g, '');
      if (/^-?\d+\.?\d*$/.test(s)) return Number(s);
      if (s === "true") return true;
      if (s === "false") return false;
      if (s === "null" || s === "") return null;
      return s;
    });
    if (ary.length === 1) return ary[0];
    return ary;
  };

  Movement.stringToObjAry = function(string, thisobj) {
    thisobj = thisobj || this;
    var ary = string.split('\n');
    var obj = {};
    ary = ary.filter(function(i) { return i != "" });
    ary.forEach(function(e, i, a) {
      var s = /^(.*):(.*)/.exec(e);
      if (s) {
        var key = newKey = s[1];
        if (obj.hasOwnProperty(key)) {
          var i = 1;
          while (obj.hasOwnProperty(newKey)) {
            newKey = key + String(i);
            i++;
          }
        }
        obj[newKey] = thisobj.stringToAry(s[2]);
      }
    });
    return obj;
  };
  Movement.proccessParameters();

  //-----------------------------------------------------------------------------
  // Polygon_Collider
  //
  // This class handles Polygon Colliders for characters.

  function Polygon_Collider() {
      this.initialize.apply(this, arguments);
  };
  Polygon_Collider.prototype.constructor = Polygon_Collider;

  Polygon_Collider.prototype.initialize = function(points) {
    this.shift_y = 0;
    this.x  = this.y  = 0;
    this.ox = this.oy = 0;
    this.radian = 0;
    this._scale = new Point(1, 1);
    this.pivot = new Point(0, 0);
    this.makeVertices(points);
  };

  Polygon_Collider.prototype.makeVertices = function(points) {
    this._vertices = [];
    this.baseVertices = [];
    points = points.map(function(point) {
      if (point.constructor === Array) {
        var x = Number(point[0]);
        var y = Number(point[1]);
        return new Point(x, y);
      }
      return point;
    });
    for (var i = 0; i < points.length; i++) {
      var x = points[i].x;
      var y = points[i].y;
      this._vertices.push(new Point(x, y));
      this.baseVertices.push(new Point(x, y));
    }
    this.makeVectors();
    this.setBounds();
    this.vertices(true);
  };

  Polygon_Collider.prototype.setBounds = function() {
    var points = [];
    for (var i = 0; i < this.baseVertices.length; i++) {
      var x = this.baseVertices[i].x;
      var y = this.baseVertices[i].y;
      points.push(new Point(x, y));
    }
    points.sort(function(a, b) {
      return a.x - b.x;
    });
    this._xMin = points[0].x;
    this._xMax = points[points.length - 1].x;
    points.sort(function(a, b) {
      return a.y- b.y;
    });
    this._yMin = points[0].y;
    this._yMax = points[points.length - 1].y;
    this.width  = Math.abs(this._xMax - this._xMin);
    this.height = Math.abs(this._yMax - this._yMin);
    this.edges = {};
    var x1 = this._xMin + this.x + this.offsetX();
    var x2 = this._xMax + this.x + this.offsetX();
    var y1 = this._yMin + this.y + this.offsetY();
    var y2 = this._yMax + this.y + this.offsetY();
    var topLeft     = new Point(x1, y1);
    var topRight    = new Point(x2, y1);
    var bottomLeft  = new Point(x1, y2);
    var bottomRight = new Point(x2, y2);
    this.edges.left   = [topLeft, bottomLeft];
    this.edges.right  = [topRight, bottomRight];
    this.edges.top    = [topLeft, topRight];
    this.edges.bottom = [bottomLeft, bottomRight];
    this.center = new Point(topLeft.x + (this.width / 2), topLeft.y + (this.height / 2));
  };

  Polygon_Collider.prototype.makeVectors = function() {
    this.vectors = [];
    for (var i = 0; i < this.baseVertices.length; i++) {
      var x = this.baseVertices[i].x;
      var y = this.baseVertices[i].y;
      var dx = x - this.pivot.x;
      var dy = y - this.pivot.y;
      var vector = {};
      vector.radian = Math.atan2(dy, dx);
      vector.radian += vector.radian < 0 ? Math.PI * 2 : 0;
      vector.dist = Math.sqrt(dx * dx + dy * dy);
      this.vectors.push(vector);
    }
  };

  Polygon_Collider.prototype.reshape = function(points) {
    this.initialize(points);
  };

  Polygon_Collider.prototype.isCircle = function() {
    return false;
  };

  Polygon_Collider.prototype.setRadian = function(radian) {
    this.rotate(radian - this.radian);
  };

  Polygon_Collider.prototype.moveto = function(x, y) {
    if (x !== this.x || y !== this.y){
      this.x = x;
      this.y = y;
      this.vertices(true);
    }
  };

  Polygon_Collider.prototype.setPivot = function(x, y) {
    this.pivot.x = x;
    this.pivot.y = y;
    this.makeVectors();
    this.vertices(true);
  };

  Polygon_Collider.prototype.centerPivot = function() {
    this.pivot.x = this.width / 2;
    this.pivot.y = this.height / 2;
    this.makeVectors();
    this.rotate(0); // adjusts base vertices
    this.vertices(true);
  };

  Polygon_Collider.prototype.rotate = function(radian) {
    this.radian += radian;
    for (var i = 0; i < this.vectors.length; i++) {
      var vector = this.vectors[i];
      vector.radian += radian;
      var x = vector.dist * Math.cos(vector.radian);
      var y = vector.dist * Math.sin(vector.radian);
      this.baseVertices[i].x = Math.round(x);
      this.baseVertices[i].y = Math.round(y);
    }
    this.vertices(true);
  };

  Polygon_Collider.prototype.scale = function(zX, zY) {
    this._scale.x *= zX;
    this._scale.y *= zY;
    for (var i = 0; i < this.vectors.length; i++) {
      var vector = this.vectors[i];
      var x = vector.dist * Math.cos(vector.radian);
      var y = vector.dist * Math.sin(vector.radian);
      x *= zX;
      y *= zY;
      vector.radian = Math.atan2(y, x);
      vector.radian += vector.radian < 0 ? Math.PI * 2 : 0;
      vector.dist = Math.sqrt(x * x + y * y);
      this.baseVertices[i].x = Math.round(x);
      this.baseVertices[i].y = Math.round(y);
    }
    this.vertices(true);
  };

  Polygon_Collider.prototype.scaleTo = function(zX, zY) {
    var newZX = zX / this._scale.x;
    var newZY = zY / this._scale.y;
    this.scale(newZX, newZY);
  };

  Polygon_Collider.prototype.vertices = function(reset) {
    if (reset || !this._vertices) {
      var i, j;
      for (i = 0, j = this._vertices.length; i < j; i++) {
        this._vertices[i].x = this.x + this.baseVertices[i].x;
        this._vertices[i].x += this.offsetX();
        this._vertices[i].y = this.y + this.baseVertices[i].y;
        this._vertices[i].y += this.offsetY();
      }
      this.setBounds();
    }
    return this._vertices;
  };

  Polygon_Collider.prototype.gridEdge = function() {
    var x1 = this._xMin + this.x + this.offsetX();
    var x2 = this._xMax + this.x + this.offsetX();
    var y1 = this._yMin + this.y + this.offsetY();
    var y2 = this._yMax + this.y + this.offsetY();
    x1 = Math.floor(x1 / Movement.tileSize);
    x2 = Math.floor(x2 / Movement.tileSize);
    y1 = Math.floor(y1 / Movement.tileSize);
    y2 = Math.floor(y2 / Movement.tileSize);
    return [x1, x2, y1, y2];
  };

  Polygon_Collider.prototype.offsetX = function() {
    return this.ox + this.pivot.x;
  };

  Polygon_Collider.prototype.offsetY = function() {
    return this.oy + this.pivot.y - this.shift_y;
  };

  Polygon_Collider.prototype.intersects = function(other) {
    if (this.height === 0 || this.width === 0) return false;
    if (this.containsPoint(other.center.x, other.center.y)) return true;
    if (other.containsPoint(this.center.x, this.center.y)) return true;
    var i, j, x1, y1;
    for (i = 0, j = other.vertices().length; i < j; i++) {
      x1 = other.vertices()[i].x;
      y1 = other.vertices()[i].y;
      if (this.containsPoint(x1, y1)) return true;
    }
    for (i = 0, j = this.vertices().length; i < j; i++) {
      x1 = this.vertices()[i].x;
      y1 = this.vertices()[i].y;
      if (other.containsPoint(x1, y1)) return true;
    }
    return false
  };

  Polygon_Collider.prototype.inside = function(other) {
    if (this.height === 0 || this.width === 0) return false;
    var i, j;
    for (i = 0, j = other.vertices().length; i < j; i++) {
      if (!this.containsPoint(vertices[i].x, vertices[i].y)) {
        return false;
      }
    }
    return true;
  };

  Polygon_Collider.prototype.halfInside = function(other) {
    if (this.height === 0 || this.width === 0) return false;
    var vertices = other.vertices();
    var pass = 0;
    var i, j;
    for (i = 0, j = vertices.length; i < j; i++) {
      if (!this.containsPoint(vertices[i].x, vertices[i].y)) {
        pass++;
        if (pass >= j / 2) {
          return false;
        }
      }
    }
    return true;
  };

  Polygon_Collider.prototype.containsPoint = function(x, y) {
    var i;
    var j = this._vertices.length - 1;
    var odd = false;
    var poly = this._vertices;
    for (i = 0; i < this._vertices.length; i++) {
      if (poly[i].y < y && poly[j].y >= y || poly[j].y < y && poly[i].y >= y) {
        if (poly[i].x + (y - poly[i].y) / (poly[j].y - poly[i].y) * (poly[j].x - poly[i].x) < x) {
          odd = !odd;
        }
      }
      j = i;
    }
    return odd;
  };

  Movement.Polygon_Collider = Polygon_Collider;

  //-----------------------------------------------------------------------------
  // Box_Collider
  //
  // This class handles Box Colliders for characters.

  function Box_Collider() {
    this.initialize.apply(this, arguments);
  };
  Box_Collider.prototype = Object.create(Polygon_Collider.prototype);
  Box_Collider.prototype.constructor = Box_Collider;

  Box_Collider.prototype.initialize = function(w, h, ox, oy, shift_y) {
    var points = [];
    points.push(new Point(0, 0));
    points.push(new Point(w - 1, 0));
    points.push(new Point(w - 1, h - 1));
    points.push(new Point(0, h - 1));
    this.x = this.y = 0;
    this.ox = ox || 0;
    this.oy = oy || 0;
    this.radian = 0;
    this.shift_y = shift_y || 0;
    this._scale = new Point(1, 1);
    this.pivot = new Point(w / 2, h / 2);
    this.makeVertices(points);
    this.rotate(0);
  };

  Movement.Box_Collider = Box_Collider;

  //-----------------------------------------------------------------------------
  // Circle_Collider
  //
  // This class handles Circle Colliders for characters.

  function Circle_Collider() {
      this.initialize.apply(this, arguments);
  };
  Circle_Collider.prototype = Object.create(Polygon_Collider.prototype);
  Circle_Collider.prototype.constructor = Circle_Collider;

  Circle_Collider.prototype.initialize = function(w, h, ox, oy, shift_y) {
    this.radiusX  = w / 2;
    this.radiusY  = h / 2;
    var points = [];
    for (var i = 7; i >= 0; i--) {
      // start at 3 PI / 4 and go clockwise
      var rad = Math.PI / 4 * i + Math.PI;
      var x = this.radiusX + this.radiusX * Math.cos(rad);
      var y = this.radiusY + this.radiusY * -Math.sin(rad);
      points.push(new Point(x, y));
    }
    this.x = this.y = 0;
    this.ox = ox || 0;
    this.oy = oy || 0;
    this.radian = 0;
    this.shift_y = shift_y || 0;
    this._scale = new Point(1, 1);
    this.pivot = new Point(w / 2, h / 2);
    this.makeVertices(points);
    this.scale(1, 1);
  };

  Circle_Collider.prototype.isCircle = function() {
    return true;
  };

  Circle_Collider.prototype.scale = function(zX, zY) {
    Polygon_Collider.prototype.scale.call(this, zX, zY);
    this.radiusX *= zX;
    this.radiusY *= zY;
  };

  Circle_Collider.prototype.circlePosition = function(radian, test) {
    var x = this.radiusX * Math.cos(radian);
    var y = this.radiusY * -Math.sin(radian);
    // Convert to vector
    var dist = Math.sqrt(x * x + y * y);
    // Adjust radian
    radian -= this.radian;
    // Convert back to x / y components
    x = dist * Math.cos(radian);
    y = dist * -Math.sin(radian);
    return [this.center.x + x, this.center.y + y];
  };

  Circle_Collider.prototype.intersects = function(other) {
    if (this.height === 0 || this.width === 0) return false;
    if (this.containsPoint(other.center.x, other.center.y)) return true;
    if (other.containsPoint(this.center.x, this.center.y)) return true;
    var x1 = this.center.x;
    var x2 = other.center.x;
    var y1 = this.center.y;
    var y2 = other.center.y;
    var rad = Math.atan2(y1 - y2, x2 - x1);
    rad += rad < 0 ? 2 * Math.PI : 0;
    var pos = this.circlePosition(rad);
    if (other.containsPoint(pos[0], pos[1])) return true;
    if (other.isCircle()) {
      rad = Math.atan2(y2 - y1, x1 - x2);
      rad += rad < 0 ? 2 * Math.PI : 0;
      pos = other.circlePosition(rad);
      if (this.containsPoint(pos[0], pos[1])) return true;
    }
    var i, j;
    for (i = 0, j = other.vertices().length; i < j; i++) {
      x1 = other.vertices()[i].x;
      y1 = other.vertices()[i].y;
      if (this.containsPoint(x1, y1)) return true;
    }
    for (i = 0, j = this.vertices().length; i < j; i++) {
      x1 = this.vertices()[i].x;
      y1 = this.vertices()[i].y;
      if (other.containsPoint(x1, y1)) return true;
    }
    return false;
  };

  Circle_Collider.prototype.containsPoint = function(x, y) {
    var h = this.center.x;
    var k = this.center.y;
    var xOverRx = Math.pow(x - h, 2) / Math.pow(this.radiusX, 2);
    var yOverRy = Math.pow(y - k, 2) / Math.pow(this.radiusY, 2);
    return xOverRx + yOverRy <= 1;
  };

  Movement.Circle_Collider = Circle_Collider

  //-----------------------------------------------------------------------------
  // Game_Temp
  //
  // The game object class for temporary data that is not included in save data.

  var Alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    Alias_Game_Temp_initialize.call(this);
    this._destinationPX = null;
    this._destinationPY = null;
  };

  Game_Temp.prototype.setPixelDestination = function(x, y) {
    this._destinationPX = x;
    this._destinationPY = y;
    var x1 = $gameMap.roundX(Math.floor(x / $gameMap.tileWidth()));
    var y1 = $gameMap.roundY(Math.floor(y / $gameMap.tileHeight()));
    this.setDestination(x1, y1);
  };

  var Alias_Game_Temp_clearDestination = Game_Temp.prototype.clearDestination;
  Game_Temp.prototype.clearDestination = function() {
    Alias_Game_Temp_clearDestination.call(this);
    this._destinationPX = null;
    this._destinationPY = null;
  };

  Game_Temp.prototype.destinationPX = function() {
    return this._destinationPX;
  };

  Game_Temp.prototype.destinationPY = function() {
    return this._destinationPY;
  };

  var Alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function() {
    Alias_Scene_Map_onMapLoaded.call(this);
    $gameMap.reloadAllBoxes();
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //
  // The game object class for a map. It contains scrolling and passage
  // determination functions.

  var Alias_Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    delete Movement._mapColliders;
    Alias_Game_Map_setup.call(this, mapId);
    $gameMap.reloadAllBoxes();
    this.refereshVehicles();
  };

  Game_Map.prototype.flagAt = function(x, y) {
    var x = x || $gamePlayer.x;
    var y = y || $gamePlayer.y;
    var flags = this.tilesetFlags();
    var tiles = this.allTiles(x, y);
    for (var i = 0; i < tiles.length; i++) {
      var flag = flags[tiles[i]];
      console.log("layer", i, ":", flag);
      if (flag & 0x20)  console.log("layer", i, "is ladder");
      if (flag & 0x40)  console.log("layer", i, "is bush");
      if (flag & 0x80)  console.log("layer", i, "is counter");
      if (flag & 0x100) console.log("layer", i, "is damage");
    }
  };

  Game_Map.prototype.tileWidth = function() {
    return Movement.tileSize;
  };

  Game_Map.prototype.tileHeight = function() {
    return Movement.tileSize;
  };

  Game_Map.prototype.reloadAllBoxes = function() {
    delete Movement._mapColliders;
    delete Movement._characterGrid;
    this.reloadTileMap();
    var events   = this.events();
    var vehicles = this._vehicles;
    var i, j;
    for (i = 0, j = events.length; i < j; i++) {
      events[i].reloadBoxes();
    }
    for (i = 0, j = vehicles.length; i < j; i++) {
      vehicles[i].reloadBoxes();
    }
    $gamePlayer.reloadBoxes();
    $gamePlayer.followers().forEach(function(follower) {
      follower.reloadBoxes();
    });
  };

  Game_Map.prototype.removeAllBoxes = function() {
    delete Movement._mapColliders;
    delete Movement._characterGrid;
    this.disposeCollisionmap();
  };

  Game_Map.prototype.reloadTileMap = function() {
    Movement._mapColliders = new Array(this.width());
    for (var x = 0; x < Movement._mapColliders.length; x++) {
      Movement._mapColliders[x] = [];
      for (var y = 0; y < this.height(); y++) {
        Movement._mapColliders[x].push([]);
      }
    }
    Movement._characterGrid = new Array(this.width());
    for (var x = 0; x < Movement._characterGrid.length; x++) {
      Movement._characterGrid[x] = [];
      for (var y = 0; y < this.height(); y++) {
        Movement._characterGrid[x].push([]);
      }
    }
    var cm = /<cm=(.*)>/i.exec($dataMap.note);
    var rm = /<rm=(.*)>/i.exec($dataMap.note);
    this.setupMapColliders();
    this.loadCollisionmap(cm ? cm[1] : null);
    this.loadRegionmap(rm ? rm[1] : null);
  };

  Game_Map.prototype.setupMapColliders = function() {
    for (var x = 0; x < this.width(); x++) {
      for (var y = 0; y < this.height(); y++) {
        var flags = this.tilesetFlags();
        var tiles = this.allTiles(x, y);
        for (var i = tiles.length; i >= 0; i--) {
          var flag = flags[tiles[i - 1]];
          if (flag === 16) continue;
          var box = this.mapCollider(x, y, flag);
          Movement._mapColliders[x][y] = Movement._mapColliders[x][y].concat(box);
        }
      }
    }
  };

  Game_Map.prototype.mapCollider = function(x, y, flag) {
    var realFlag = flag;
    if (flag >> 12 > 0) {
      flag = flag.toString(2);
      flag = flag.slice(flag.length - 12, flag.length);
      flag = parseInt(flag, 2);
    }
    if (Movement.regionBoxes[this.regionId(x, y)]) {
      var regionData = Movement.regionBoxes[this.regionId(x, y)];
      var boxData = [];
      for (var i = 0; i < regionData.length; i++) {
        var data = [];
        data[0] = regionData[i]["width"] || 0;
        data[1] = regionData[i]["height"] || 0;
        data[2] = regionData[i]["ox"] || 0;
        data[3] = regionData[i]["oy"] || 0;
        data[4] = regionData[i]["tag"] || "";
        boxData[i] = data;
      }
      flag = 0;
    } else {
      var boxData = Movement.tileBoxes[flag];
    }
    if (!boxData) {
      if (flag & 0x20 || flag & 0x40 || flag & 0x80 || flag & 0x100) {
        boxData = [Movement.tileSize, Movement.tileSize, 0, 0];
      } else {
        return [];
      }
    }
    var tilebox = [];
    if (boxData[0].constructor === Array){
      var i = 0;
      boxData.forEach(function(box) {
        var newBox = this.makeTileCollider(x, y, realFlag, box, i);
        tilebox.push(newBox);
        i++;
      }, this);
    } else {
      var newBox = this.makeTileCollider(x, y, realFlag, boxData);
      tilebox.push(newBox);
    }
    return tilebox;
  };

  Game_Map.prototype.makeTileCollider = function(x, y, flag, boxData, index) {
    var x1 = x * Movement.tileSize;
    var y1 = y * Movement.tileSize;
    var ox = boxData[2] || 0;
    var oy = boxData[3] || 0;
    var w  = boxData[0];
    var h  = boxData[1];
    var newBox = new Box_Collider(w, h, ox, oy);
    newBox.moveto(x1, y1);
    newBox.note      = boxData[4] || "";
    newBox.flag      = flag;
    newBox.terrain   = flag >> 12;
    newBox.isWater1  = flag >> 12 === Movement.water1Tag || /<water1>/i.test(newBox.note);
    newBox.isWater2  = flag >> 12 === Movement.water2Tag || /<water2>/i.test(newBox.note);
    newBox.isLadder  = (flag & 0x20)  || /<ladder>/i.test(newBox.note);
    newBox.isBush    = (flag & 0x40)  || /<bush>/i.test(newBox.note);
    newBox.isCounter = (flag & 0x80)  || /<counter>/i.test(newBox.note);
    newBox.isDamage  = (flag & 0x100) || /<damage>/i.test(newBox.note);
    var vx = x * this.height() * this.width();
    var vy = y * this.height();
    var vz = index || (Movement._mapColliders[x][y] ? Movement._mapColliders[x][y].length : 0);
    newBox.location  = vx + vy + vz;
    if (newBox.isWater2) {
      newBox.color = Movement.water2;
    } else if (newBox.isWater1) {
      newBox.color = Movement.water1;
    } else if (newBox.isLadder || newBox.isBush || newBox.isDamage) {
      newBox.color = '#ffffff';
    } else {
      newBox.color = Movement.collision;
    }
    return newBox;
  };

  Game_Map.prototype.loadCollisionmap = function(cm) {
    if (cm) {
      Movement._collisionmap = ImageManager.loadBitmap(Movement.cmFolder, cm);
    } else {
      Movement._collisionmap = new Bitmap(this.width() * Movement.tileSize, this.height() * Movement.tileSize);
    }
    if (Movement.showBoxes && $gameTemp.isPlaytest()) {} {
      Movement._collisionmap.addLoadListener(function() {
        $gameMap.drawTileBoxes();
      });
    }
  };

  Game_Map.prototype.loadRegionmap = function(rm) {
    if (rm) {
      Movement._regionmap = ImageManager.loadBitmap(Movement.rmFolder, rm);
    } else {
      Movement._regionmap = new Bitmap(this.width() * Movement.tileSize, this.height() * Movement.tileSize);
    }
  };

  Game_Map.prototype.disposeCollisionmap = function() {
    if (Movement._collisionmap) delete Movement._collisionmap;
    if (Movement._regionmap)    delete Movement._regionmap;
  };

  Game_Map.prototype.drawTileBoxes = function() {
    for (var x = 0; x < this.width(); x++) {
      for (var y = 0; y < this.height(); y++) {
        var boxes = Movement._mapColliders[x][y];
        for (var i = 0; i < boxes.length; i++) {
          var x1 = boxes[i].x;
          var y1 = boxes[i].y;
          var ox = boxes[i].ox;
          var oy = boxes[i].oy;
          var w  = boxes[i].width;
          var h  = boxes[i].height;
          var color = boxes[i].color || Movement.collision;
          Movement._collisionmap.fillRect(x1 + ox, y1 + oy, w, h, color);
        }
      }
    }
  };

  Game_Map.prototype.collisionMapPass = function(collider, dir, passableColors) {
    if (!Movement._collisionmap.isReady()) return false;
    if (collider.isCircle()) {
      return this.collisionMapCirclePass(collider, dir, passableColors);
    }
    return this.collisionMapBoxPass(collider, dir, passableColors);
  };

  Game_Map.prototype.insidePassableOnly = function(collider, passableColors) {
    passableColors.splice(passableColors.indexOf("#000000"), 1);
    return this.collisionMapBoxPass(collider, "top", passableColors) &&
           this.collisionMapBoxPass(collider, "bottom", passableColors);
  };

  Game_Map.prototype.collisionMapBoxPass = function(collider, dir, passableColors) {
    var x1 = Math.floor(collider.edges[dir][0].x);
    var x2 = Math.floor(collider.edges[dir][1].x);
    var y1 = Math.floor(collider.edges[dir][0].y);
    var y2 = Math.floor(collider.edges[dir][1].y);
    for (var x = x1; x <= x2; x++) {
      for (var y = y1; y <= y2; y++) {
        if (!passableColors.contains(Movement._collisionmap.getColor(x, y))) {
          return false;
        }
      }
    }
    return true;
  };

  Game_Map.prototype.collisionMapPolyPass = function(collider, dir, passableColors) {
    var points = collider.vertices().slice();
    var finalPoints = [];
    var midPoints = [];
    if (["top", "bottom"].contains(dir)) {
      var startPoint = this.collisionMapPoints(collider, dir, collider._xMin, 0);
      var endPoint   = this.collisionMapPoints(collider, dir, collider._xMax, 0);
    } else {
      var startPoint = this.collisionMapPoints(collider, dir, collider._yMin, 1);
      var endPoint   = this.collisionMapPoints(collider, dir, collider._yMax, 1);
      var horz = true;
    }
    var minIndex  = collider.baseVertices.indexOf(startPoint);
    var maxIndex  = collider.baseVertices.indexOf(endPoint);
    var endPoint  = collider.vertices()[maxIndex];
    var firstHalf = points.splice(0, minIndex);
    points = points.concat(firstHalf);
    if (["bottom", "left"].contains(dir)) {
      points.reverse();
      points.unshift(points.pop());
    }
    for (var i = 0; i < points.length - 1; i++) {
      var x1 = points[i].x;
      var y1 = points[i].y;
      var x2 = points[i + 1].x;
      var y2 = points[i + 1].y;
      var rad = Math.atan2(y1 - y2, x2 - x1);
      if (horz) {
        var steps = Math.abs(y2 - y1);
        var slope  = (x2 - x1) / steps;
        var inc = y1 > y2 ? -1 : 1;
      } else {
        var steps = Math.abs(x2 - x1);
        var slope  = (y2 - y1) / steps;
        var inc = x1 > x2 ? -1 : 1;
      }
      var a1 = a2 = horz ? y1 : x1;
      while ((a1 - a2) <= steps) {
        if (!passableColors.contains(Movement._collisionmap.getColor(x1, y1))) {
          return false;
        }
        a1++;
        y1 += horz ? inc : slope;
        x1 += horz ? slope : inc;
      }
      if (x2 === endPoint.x && y2 === endPoint.y) {
        break;
      }
    }
    return true;
  };

  Game_Map.prototype.collisionMapPoints = function(collider, dir, value, axis) {
    var point = collider.baseVertices.filter(function(p) {
      return axis === 0 ? p.x === value : p.y === value;
    });
    point.sort(function(a, b) {
      if (axis === 0) {
        if (dir === "top") {
          return a.y - b.y;
        } else {
          return b.y - a.y;
        }
      } else {
        if (dir === "left") {
          return a.x - b.x;
        } else {
          return b.x - a.x;
        }
      }
    });
    point = point[0];
    for (var i = 0; i < collider.baseVertices.length; i++) {
      if (collider.baseVertices[i].x === point.x && collider.baseVertices[i].y === point.y) {
        return collider.baseVertices[i];
      }
    }
  };

  Game_Map.prototype.collisionMapCirclePass = function(collider, dir, passableColors) {
    switch (dir) {
      case "bottom":
        var r1 = Math.PI;
        var r2 = Math.PI * 2;
        var s = Math.PI / collider.width;
        break;
      case "left":
        var r1 = Math.PI / 2;
        var r2 = 3 * Math.PI / 2;
        var s = Math.PI / collider.height;
        break;
      case "right":
        var r1 = -Math.PI / 2;
        var r2 = Math.PI / 2;
        var s = Math.PI / collider.height;
        break;
      case "top":
        var r1 = 0;
        var r2 = Math.PI;
        var s = Math.PI / collider.width;
        break;
    }
    while (r1 <= r2) {
      var pos = collider.circlePosition(r1);
      var x = Math.floor(pos[0]);
      var y = Math.floor(pos[1]);
      if (!passableColors.contains(Movement._collisionmap.getColor(x, y))) {
        return false;
      }
      r1 += s;
    }
    return true;
  };

  Game_Map.prototype.getTileBoxesAt = function(collider, ignore) {
    if (!Movement._mapColliders) return [];
    ignore = ignore || function() { return false; };
    var edge = collider.gridEdge();
    var x1   = edge[0];
    var x2   = edge[1];
    var y1   = edge[2];
    var y2   = edge[3];
    var boxes = [];
    for (var x = x1; x <= x2; x++) {
      for (var y = y1; y <= y2; y++) {
        if (x < 0 || x >= this.width())  continue;
        if (y < 0 || y >= this.height()) continue;
        for (var i = 0; i < Movement._mapColliders[x][y].length; i++) {
          if (ignore(Movement._mapColliders[x][y][i])) continue;
          if (collider.intersects(Movement._mapColliders[x][y][i])) {
            boxes.push(Movement._mapColliders[x][y][i]);
          }
        }
      }
    }
    return boxes;
  };

  Game_Map.prototype.getCharactersAt = function(collider, ignore) {
    ignore = ignore || function() { return false; };
    var edge = collider.gridEdge();
    var x1   = edge[0];
    var x2   = edge[1];
    var y1   = edge[2];
    var y2   = edge[3];
    var charas = [];
    var x, y, i;
    for (x = x1; x <= x2; x++) {
      for (y = y1; y <= y2; y++) {
        if (x < 0 || x >= this.width())  continue;
        if (y < 0 || y >= this.height()) continue;
        for (i = 0; i < Movement._characterGrid[x][y].length; i++) {
          if (ignore(Movement._characterGrid[x][y][i])) continue;
          if (collider.intersects(Movement._characterGrid[x][y][i].collider())) {
            if (!charas.contains(Movement._characterGrid[x][y][i])) {
              charas.push(Movement._characterGrid[x][y][i]);
            }
          }
        }
      }
    }
    return charas;
  };

  Game_Map.prototype.updateCharacterGrid = function(chara, prev) {
    if (!Movement._characterGrid) return;
    var box  = chara.collider();
    var edge = box.gridEdge();
    var x1   = edge[0];
    var x2   = edge[1];
    var y1   = edge[2];
    var y2   = edge[3];
    var boxesInside = 0;
    var totalBoxes  = (prev[1] - prev[0]) * (prev[3] - prev[2]);
    for (var x = prev[0]; x <= prev[1]; x++) {
      for (var y = prev[2]; y <= prev[3]; y++) {
        if (x < 0 || x >= this.width()) {
          continue;
        } else if (y < 0 || y >= this.height()) {
          continue;
        }
        if (Movement._characterGrid[x][y].contains(chara)) {
          boxesInside++;
        }
      }
    }
    if (boxesInside == totalBoxes) return;
    for (var x = prev[0]; x <= prev[1]; x++) {
      for (var y = prev[2]; y <= prev[3]; y++) {
        if (x < 0 || x >= this.width()) {
          continue;
        } else if (y < 0 || y >= this.height()) {
          continue;
        }
        var i = Movement._characterGrid[x][y].indexOf(chara);
        if (i === -1) continue;
        Movement._characterGrid[x][y].splice(i, 1);
      }
    }
    for (var x = x1; x <= x2; x++) {
      for (var y = y1; y <= y2; y++) {
        if (x < 0 || x >= this.width()) {
          continue;
        } else if (y < 0 || y >= this.height()) {
          continue;
        }
        Movement._characterGrid[x][y].push(chara);
      }
    }
  };

  Game_Map.prototype.getPixelRegion = function(x, y) {
    if (Movement._regionmap) {
      if (!Movement._regionmap.isReady()) return 0;
      return Movement._regionmap.getColor(x || $gamePlayer.cx(), y || $gamePlayer.cy());
    }
    return 0;
  };

  Game_Map.prototype.adjustPX = function(x) {
    return this.adjustX(x / Movement.tileSize) * Movement.tileSize;
  };

  Game_Map.prototype.adjustPY = function(y) {
    return this.adjustY(y / Movement.tileSize) * Movement.tileSize;
  };

  Game_Map.prototype.roundPX = function(x) {
    return this.isLoopHorizontal() ? x.mod(this.width() * Movement.tileSize) : x;
  };

  Game_Map.prototype.roundPY = function(y) {
    return this.isLoopVertical() ? y.mod(this.height() * Movement.tileSize) : y;
  };

  Game_Map.prototype.pxWithDirection = function(x, d, dist) {
    return x + (d === 6 ? dist : d === 4 ? -dist : 0);
  };

  Game_Map.prototype.pyWithDirection = function(y, d, dist) {
    return y + (d === 2 ? dist : d === 8 ? -dist : 0);
  };

  Game_Map.prototype.roundPXWithDirection = function(x, d, dist) {
    return this.roundPX(x + (d === 6 ? dist : d === 4 ? -dist : 0));
  };

  Game_Map.prototype.roundPYWithDirection = function(y, d, dist) {
    return this.roundPY(y + (d === 2 ? dist : d === 8 ? -dist : 0));
  };

  Game_Map.prototype.deltaPX = function(x1, x2) {
    var result = x1 - x2;
    if (this.isLoopHorizontal() && Math.abs(result) > (this.width() * Movement.tileSize) / 2) {
      if (result < 0) {
        result += this.width() * Movement.tileSize;
      } else {
        result -= this.width() * Movement.tileSize;
      }
    }
    return result;
  };

  Game_Map.prototype.deltaPY = function(y1, y2) {
    var result = y1 - y2;
    if (this.isLoopVertical() && Math.abs(result) > (this.height() * Movement.tileSize) / 2) {
      if (result < 0) {
        result += this.height() * Movement.tileSize;
      } else {
        result -= this.height() * Movement.tileSize;
      }
    }
    return result;
  };

  Game_Map.prototype.canvasToMapPX = function(x) {
    var tileWidth = this.tileWidth();
    var originX = this._displayX * tileWidth;
    return this.roundPX(originX + x);
  };

  Game_Map.prototype.canvasToMapPY = function(y) {
    var tileHeight = this.tileHeight();
    var originY = this._displayY * tileHeight;
    return this.roundPY(originY + y);
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  // The superclass of Game_Character. It handles basic information, such as
  // coordinates and images, shared by all characters.

  Object.defineProperties(Game_CharacterBase.prototype, {
      px: { get: function() { return this._px; }, configurable: true },
      py: { get: function() { return this._py; }, configurable: true }
  });

  var Alias_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    Alias_Game_CharacterBase_initMembers.call(this);
    this._px = this._py = this._realPx = this._realPy = 0;
    this._diagonal = false;
    this._grid = Movement.grid;
    this._gridPosition = [];
    this._currentPosition;
    this._passabilityLevel = 0;
    var isPlayer = this.constructor === Game_Player;
    this._smartMoveDir   = isPlayer && (Movement.smartMove == 2 || Movement.smartMove == 3);
    this._smartMoveSpeed = isPlayer && (Movement.smartMove == 1 || Movement.smartMove == 3);
    this._dir4Diag = {
      8: [[4, 8], [6, 8]],
      6: [[6, 8], [6, 2]],
      2: [[4, 2], [6, 2]],
      4: [[4, 8], [4, 2]]
    };
    this._moveCount = 0;
    this._freqCount = 0;
    this._diagonal  = false;
    this._currentRad = this._targetRad = 0;
    this._piviotX = this._piviotY = 0;
    this._radiusL = this._radisuH = 0;
    this._angularSpeed;
  }

  Game_CharacterBase.prototype.notes = function() {
    if (this.constructor === Game_Player || this.constructor === Game_Follower) {
      return this.actor() ? this.actor().actor().note : "";
    } else if (this.constructor === Game_Event) {
      return this.event().note;
    } else {
      return "";
    }
  };

  Game_CharacterBase.prototype.direction8 = function(horz, vert) {
    if (horz === 4 && vert === 8) return 7;
    if (horz === 4 && vert === 2) return 1;
    if (horz === 6 && vert === 8) return 9;
    if (horz === 6 && vert === 2) return 3;
    return 5;
  };

  Game_CharacterBase.prototype.isMoving = function() {
    return this._moveCount > 0;
  };

  Game_CharacterBase.prototype.startedMoving = function() {
    return this._realPX !== this._px || this._realPY !== this._py;
  };

  Game_CharacterBase.prototype.isStopping = function() {
    return !this.isMoving() && !this.isJumping();
  };

  Game_CharacterBase.prototype.startedStopping = function() {
    return !this.startedMoving() && !this.isJumping();
  };

  Game_CharacterBase.prototype.isDiagonal = function() {
    return this._diagonal;
  };

  Game_CharacterBase.prototype.isArcing = function() {
    return this._currentRad !== this._targetRad;
  };

  Game_CharacterBase.prototype.gridChanged = function() {
    return this._gridPosition !== this.collider().gridEdge();
  };

  Game_CharacterBase.prototype.positionChanged = function() {
    return this._currentPosition !== this.collider().center;
  };

  var Alias_Game_CharacterBase_setPosition = Game_CharacterBase.prototype.setPosition;
  Game_CharacterBase.prototype.setPosition = function(x, y) {
    Alias_Game_CharacterBase_setPosition.call(this, x, y);
    this._px = this._realPX = x * Movement.tileSize;
    this._py = this._realPY = y * Movement.tileSize;
    if (this.constructor === Game_Event) {
      if (!this.page()) return;
    }
    if (!this._collider) this.collider();
    this.moveAllBoxes(this.px, this.py);
  };

  Game_CharacterBase.prototype.setPixelPosition = function(x, y) {
    this.setPosition(x / Movement.tileSize, y / Movement.tileSize);
  };

  var Alias_Game_CharacterBase_copyPosition = Game_CharacterBase.prototype.copyPosition;
  Game_CharacterBase.prototype.copyPosition = function(character) {
    Alias_Game_CharacterBase_copyPosition.call(this, character);
    this._px = character._px;
    this._py = character._py;
    this._realPX = character._realPX;
    this._realPY = character._realPY;
    if (!this._collider) this.collider();
    this.moveAllBoxes(this.px, this.py);
  };

  var Alias_Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
  Game_CharacterBase.prototype.setDirection = function(d) {
    if (!this.isDirectionFixed() && d) {
      if ([1, 3, 7, 9].contains(d)) {
        this._diagonal = d;
        this.resetStopCount();
        return;
      } else {
        this._diagonal = false;
      }
    }
    Alias_Game_CharacterBase_setDirection.call(this, d);
  };

  Game_CharacterBase.prototype.setPassability = function(lvl) {
    this._passabilityLevel = Number(lvl || 0);
  };

  Game_CharacterBase.prototype.passabilityLevel = function() {
    return this._passabilityLevel;
  };

  Game_CharacterBase.prototype.canPass = function(x, y, dir) {
    return this.canPixelPass(x * Movement.tileSize, y * Movement.tileSize, dir);
  };

  Game_CharacterBase.prototype.canPixelPass = function(x, y, dir, dist) {
    var dist = dist || this.moveTiles();
    var x1 = $gameMap.roundPXWithDirection(x, dir, dist);
    var y1 = $gameMap.roundPYWithDirection(y, dir, dist);
    if ($gameMap.isLoopHorizontal() || $gameMap.isLoopVertical()) {
      this.collider(dir).moveto(x1, y1);
      var edge = this.collider(dir).gridEdge();
      var x2   = edge[0];
      var x3   = edge[1];
      var y2   = edge[2];
      var y3   = edge[3];
      if (x2 < 0 || x3 > $gameMap.width() - 1 ||
          y2 < 0 || y3 > $gameMap.height() - 1) {
        var w = ($gameMap.width() - 1) * Movement.tileSize;
        var h = ($gameMap.height() - 1) * Movement.tileSize;
        x2 = x1 < 0 ? x1 + w : (x1 / 48 > $gameMap.width() - 1 ? x1 - w : x1);
        y2 = y1 < 0 ? y1 + h : (y1 / 48 > $gameMap.height() - 1 ? y1 - h : y1);
        if (!this.collisionCheck(x1, y1, dir, dist) && !this.collisionCheck(x2, y2, dir, dist)) {
          this.collider(dir).moveto(this._px, this._py);
          return false;
        }
        return true;
      }
    }
    if (!this.collisionCheck(x1, y1, dir, dist)) {
      this.collider(dir).moveto(this._px, this._py);
      return false;
    }
    return true;
  };

  Game_CharacterBase.prototype.canPassDiagonally = function(x, y, horz, vert) {
    return this.canPixelPassDiagonally(x * Movement.tileSize, y * Movement.tileSize, horz, vert);
  };

  Game_CharacterBase.prototype.canPixelPassDiagonally = function(x, y, horz, vert, dist) {
    var dist = dist || this.moveTiles();
    var x1 = $gameMap.roundPXWithDirection(x, horz, dist);
    var y1 = $gameMap.roundPYWithDirection(y, vert, dist);
    if (this._smartMoveDir) {
      return (this.canPixelPass(x, y, vert, dist) && this.canPixelPass(x, y1, horz, dist)) ||
             (this.canPixelPass(x, y, horz, dist) && this.canPixelPass(x1, y, vert, dist));
    } else {
      return (this.canPixelPass(x, y, vert, dist) && this.canPixelPass(x, y1, horz, dist)) &&
             (this.canPixelPass(x, y, horz, dist) && this.canPixelPass(x1, y, vert, dist));
    }
  };

  Game_CharacterBase.prototype.middlePass = function(x, y, dir, dist) {
    var dist = dist / 2 || this.moveTiles() / 2;
    var x1 = $gameMap.roundPXWithDirection(x, this.reverseDir(dir), dist);
    var y1 = $gameMap.roundPYWithDirection(y, this.reverseDir(dir), dist);
    this.collider(dir).moveto(x1, y1);
    if (this.collideWithTileBox(dir)) return false;
    var edge = {2: "bottom", 4: "left", 6: "right", 8: "top"};
    if (dir === 5) {
      if (!$gameMap.collisionMapPass(this.collider(dir), "top", this.passableColors()) &&
          !$gameMap.collisionMapPass(this.collider(dir), "bottom", this.passableColors())) {
        return false;
      }
    } else {
      if (!$gameMap.collisionMapPass(this.collider(dir), edge[dir], this.passableColors())) {
        return false;
      }
    }
    if (this.collideWithCharacter(dir)) return false;
    this.collider(dir).moveto(x, y);
    return true;
  };

  Game_CharacterBase.prototype.collisionCheck = function(x, y, dir, dist) {
    this.collider(dir).moveto(x, y);
    if (!this.valid(dir)) return false;
    if (this.isThrough() || this.isDebugThrough()) return true;
    if (Movement.midPass && this._passabilityLevel !== 5) {
      if (!this.middlePass(x, y, dir, dist)) return false;
    }
    if (this.collideWithTileBox(dir)) return false;
    var edge = {2: "bottom", 4: "left", 6: "right", 8: "top"};
    if (dir === 5) {
      if (!$gameMap.collisionMapPass(this.collider(), "top", this.passableColors()) ||
          !$gameMap.collisionMapPass(this.collider(), "bottom", this.passableColors())) {
        return false;
      }
    } else {
      if (!$gameMap.collisionMapPass(this.collider(dir), edge[dir], this.passableColors())) {
        return false;
      }
    }
    if (this._passabilityLevel === 1 || this._passabilityLevel === 2) {
      if (!$gameMap.insidePassableOnly(this.collider(dir), this.passableColors()) && !this.insidePassableOnlyBox(dir)) {
        return false;
      }
    }
    if (this.collideWithCharacter(dir)) return false;
    return true;
  };

  Game_CharacterBase.prototype.valid = function(dir) {
    var edge = this.collider(dir).gridEdge();
    var x1   = edge[0];
    var x2   = edge[1];
    var y1   = edge[2];
    var y2   = edge[3];
    var maxW = $gameMap.width();
    var maxH = $gameMap.height();
    if (!$gameMap.isLoopHorizontal()) {
      if (x1 < 0 || x2 >= maxW) return false;
    }
    if (!$gameMap.isLoopVertical()) {
      if (y1 < 0 || y2 >= maxH) return false;
    }
    return true;
  };

  Game_CharacterBase.prototype.collideWithTileBox = function(dir) {
    var self = this;
    var boxes = $gameMap.getTileBoxesAt(this.collider(dir), function(tile) {
      if (self.passableColors().contains(tile.color)) return true;
      return false;
    });
    return boxes.length > 0;
  };

  Game_CharacterBase.prototype.collideWithCharacter = function(dir) {
    var self = this;
    var charas = $gameMap.getCharactersAt(this.collider(dir), function(chara) {
      if (chara.isThrough() || chara === self || !chara.isNormalPriority()) {
        return true;
      }
      if (self.constructor === Game_Player) {
        if (self.isInVehicle() && chara.constructor === Game_Vehicle) {
          return chara._type === self._vehicleType;
        }
      }
      return false;
    });
    return charas.length > 0;
  };

  Game_CharacterBase.prototype.insidePassableOnlyBox = function(dir) {
    var self = this;
    var boxes = $gameMap.getTileBoxesAt(this.collider(dir), function(tile) {
      if (!self.passableColors().contains(tile.color)) return true;
      return false;
    });
    if (boxes.length === 0) return false;
    var pass = 0;
    var vertices = this.collider(dir).vertices();
    for (var i = 0; i < vertices.length; i++) {
      for (var j = 0; j < boxes.length; j++) {
        if (boxes[j].containsPoint(vertices[i].x, vertices[i].y)) {
          pass++;
        }
      }
    }
    return pass >= 4;
  };

  Game_CharacterBase.prototype.passableColors = function() {
    var colors = ["#ffffff", "#000000"];
    switch (this._passabilityLevel) {
      case 1:
      case 3:
        colors.push(Movement.water1);
        break;
      case 2:
      case 4:
        colors.push(Movement.water1);
        colors.push(Movement.water2);
        break;
    }
    return colors;
  };

  Game_CharacterBase.prototype.moveTiles = function() {
    return this._grid < this.frameSpeed() ? (Movement.offGrid ? this.frameSpeed() : this._grid) : this._grid;
  };

  Game_CharacterBase.prototype.frameSpeed = function() {
    return this.distancePerFrame() * Movement.tileSize;
  };

  Game_CharacterBase.prototype.angularSpeed = function() {
    return this._angularSpeed || this.frameSpeed() / this._radiusL;
  };

  var Alias_Game_CharacterBase_realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
  Game_CharacterBase.prototype.realMoveSpeed = function() {
    var speed = Alias_Game_CharacterBase_realMoveSpeed.call(this);
    if (this.constructor === Game_Follower) return speed;
    return speed - (this.isDiagonal() ? Movement.diagSpeed : 0);
  };

  Game_CharacterBase.prototype.freqThreshold = function() {
    return Movement.tileSize;
  };

  Game_CharacterBase.prototype.checkEventTriggerTouchFront = function(d) {
      var x2 = $gameMap.roundPXWithDirection(this.px, d, this.moveTiles());
      var y2 = $gameMap.roundPYWithDirection(this.py, d, this.moveTiles());
      this.checkEventTriggerTouch(x2, y2);
  };

  Game_CharacterBase.prototype.update = function() {
    var prevX = this._realPX;
    var prevY = this._realPY;
    if (this.collider().constructor === Object) {
      this.reloadBoxes();
    }
    if (this.startedStopping()) {
      this.updateStop();
    }
    if (this.isArcing()) {
      this.updateArc();
    }
    if (this.isJumping()) {
      this.updateJump();
    } else if (this.startedMoving()) {
      this.updateMove();
    }
    this.updateAnimation();
    if (this.positionChanged()) {
      this.onPositionChange();
    }
    if (prevX === this._realPX && prevY === this._realPY) {
      this._moveCount = 0;
    } else {
      this._moveCount++;
    }
  };

  Game_CharacterBase.prototype.updateArc = function() {
    if (this._locked) return;
    if (this._currentRad < this._targetRad) {
      var newRad = Math.min(this._currentRad + this.angularSpeed(), this._targetRad);
    }
    if (this._currentRad > this._targetRad) {
      var newRad = Math.max(this._currentRad - this.angularSpeed(), this._targetRad);
    }
    var x1 = this._piviotX + this._radiusL * Math.cos(newRad);
    var y1 = this._piviotY + this._radiusH * -Math.sin(newRad);
    this._currentRad = newRad;
    this._px = this._realPX = x1;
    this._py = this._realPY = y1;
    this._x = this._realX = this._px / Movement.tileSize;
    this._y = this._realY = this._py / Movement.tileSize;
    this.collider().moveto(x1, y1);
    this.checkEventTriggerTouchFront(this._direction);
  };

  Game_CharacterBase.prototype.updateMove = function() {
    if (this._px < this._realPX) {
      this._realPX = Math.max(this._realPX - this.frameSpeed(), this._px);
    }
    if (this._px > this._realPX) {
      this._realPX = Math.min(this._realPX + this.frameSpeed(), this._px);
    }
    if (this._py < this._realPY) {
      this._realPY = Math.max(this._realPY - this.frameSpeed(), this._py);
    }
    if (this._py > this._realPY) {
      this._realPY = Math.min(this._realPY + this.frameSpeed(), this._py);
    }

    this._x = this._px / Movement.tileSize;
    this._y = this._py / Movement.tileSize;
    this._realX = this._realPX / Movement.tileSize;
    this._realY = this._realPY / Movement.tileSize;

    if (this.constructor === Game_Event) {
      if (!this._locked) this._freqCount += this.moveTiles();
    } else if (this.constructor === Game_Player)  {
      if (!this._locked) this._freqCount += this.moveTiles();
    }

    if (!this.startedMoving()) this.refreshBushDepth();
  };

  var Alias_Game_CharacterBase_updateJump = Game_CharacterBase.prototype.updateJump;
  Game_CharacterBase.prototype.updateJump = function() {
    Alias_Game_CharacterBase_updateJump.call(this);
    this._px = this._realPX = this._x * Movement.tileSize;
    this._py = this._realPY = this._y * Movement.tileSize;
    this.moveAllBoxes(this.px, this.py);
  };

  Game_CharacterBase.prototype.updateAnimationCount = function() {
    if (this.isMoving() && this.hasWalkAnime()) {
      this._animationCount += 1.5;
    } else if (this.hasStepAnime() || !this.isOriginalPattern()) {
      this._animationCount++;
    }
  };

  Game_CharacterBase.prototype.updatePattern = function() {
    if (!this.hasStepAnime() && this.isStopping()) {
      this.resetPattern();
    } else {
      this._pattern = (this._pattern + 1) % this.maxPattern();
    }
  };

  Game_CharacterBase.prototype.onPositionChange = function() {
    if (this.gridChanged()) this.updateGridChange();
    this._currentPosition = this.collider().center;
  };

  Game_CharacterBase.prototype.updateGridChange = function() {
    $gameMap.updateCharacterGrid(this, this._gridPosition);
    this._gridPosition = this.collider().gridEdge();
  };

  Game_CharacterBase.prototype.refreshBushDepth = function() {
    if (this.isNormalPriority() && !this.isObjectCharacter() &&
        this.isOnBush() && !this.isJumping()) {
      if (!this.startedMoving()) this._bushDepth = 12;
    } else {
      this._bushDepth = 0;
    }
  };

  Game_CharacterBase.prototype.isOnLadder = function() {
    if (!this._collider) return false;
    var self = this;
    var boxes = $gameMap.getTileBoxesAt(this.collider(), function(tile) {
      if (!tile.isLadder) return true;
      if (!tile.containsPoint(Math.floor(self.cx()), Math.floor(self.cy()))) {
        return true;
      }
      return false;
    });
    return boxes.length > 0;
  };

  Game_CharacterBase.prototype.isOnBush = function() {
    if (!this._collider) return false;
    var self = this;
    var boxes = $gameMap.getTileBoxesAt(this.collider(), function(tile) {
      if (!tile.isBush) return true;
      if (!tile.containsPoint(Math.floor(self.cx()), Math.floor(self.cy()))) {
        return true;
      }
      return false;
    });
    return boxes.length > 0;
  };

  Game_CharacterBase.prototype.pixelJump = function(xPlus, yPlus) {
    return this.jump(xPlus / Movement.tileSize, yPlus / Movement.tileSize);
  };

  Game_CharacterBase.prototype.pixelJumpForward = function(dist, dir) {
    dir = dir || this._direction;
    dist = dist / Movement.tileSize;
    var x = dir === 6 ? dist : dir === 4 ? -dist : 0;
    var y = dir === 2 ? dist : dir === 8 ? -dist : 0;
    this.jump(x, y);
  };

  Game_CharacterBase.prototype.pixelJumpBackward = function(dist) {
    this.pixelJumpFixed(this.reverseDir(this.direction()), dist);
  };

  Game_CharacterBase.prototype.pixelJumpFixed = function(dir, dist) {
    var lastDirectionFix = this.isDirectionFixed();
    this.setDirectionFix(true);
    this.pixelJumpForward(dist, dir);
    this.setDirectionFix(lastDirectionFix);
  };

  Game_CharacterBase.prototype.jumpForward = function(dist, dir) {
    dist = dist || 1;
    dir = dir || this._direction;
    var x = dir === 6 ? dist : dir === 4 ? -dist : 0;
    var y = dir === 2 ? dist : dir === 8 ? -dist : 0;
    this.jump(x, y);
  };

  Game_CharacterBase.prototype.jumpBackward = function(dist) {
    this.jumpFixed(this.reverseDir(this.direction()), dist);
  };

  Game_CharacterBase.prototype.jumpFixed = function(dir, dist) {
    var lastDirectionFix = this.isDirectionFixed();
    this.setDirectionFix(true);
    this.jumpForward(dist, dir);
    this.setDirectionFix(lastDirectionFix);
  };

  Game_CharacterBase.prototype.moveStraight = function(d) {
    this.setMovementSuccess(this.canPixelPass(this.px, this.py, d));
    var originalSpeed = this._moveSpeed;
    if (this._smartMoveSpeed) this.smartMoveSpeed(d);
    if (this.isMovementSucceeded()) {
      this._diagonal = false;
      this.setDirection(d);
      this._px = $gameMap.roundPXWithDirection(this._px, d, this.moveTiles());
      this._py = $gameMap.roundPYWithDirection(this._py, d, this.moveTiles());
      this._realPX = $gameMap.pxWithDirection(this._px, this.reverseDir(d), this.moveTiles());
      this._realPY = $gameMap.pyWithDirection(this._py, this.reverseDir(d), this.moveTiles());
      this._moveCount++;
      this.increaseSteps();
      if (this.constructor === Game_Player) {
        this._followers.addMove(d, this.realMoveSpeed());
      }
    } else {
      this.setDirection(d);
      this.checkEventTriggerTouchFront(d);
    }
    this._moveSpeed = originalSpeed;
    if (!this.isMovementSucceeded() && this._smartMoveDir) {
      if (Movement.oldSmartDir) {
        var dir = this._dir4Diag[d];
        if (this.canPixelPassDiagonally(this.px, this.py, dir[0][0], dir[0][1])){
          this.moveDiagonally(dir[0][0], dir[0][1]);
        } else if (this.canPixelPassDiagonally(this.px, this.py, dir[1][0], dir[1][1])) {
          this.moveDiagonally(dir[1][0], dir[1][1]);
        }
      } else {
        this.smartMoveDir8(d);
      }
    }
  };

  Game_CharacterBase.prototype.smartMoveDir8 = function(dir) {
    var x1 = this.px;
    var y1 = this.py;
    var dist = 0;
    var horz = [4, 6].contains(dir) ? true : false;
    var steps = horz ? this.collider().height : this.collider().width;
    steps /= 2;
    for (var i = 0; i < 2; i++) {
      var sign = i === 0 ? 1 : -1;
      var j = 0;
      var x2 = x1;
      var y2 = y1;
      while (j < steps) {
        j += this.moveTiles();
        if (horz) {
          x2 = $gameMap.roundPXWithDirection(x1, dir, this.moveTiles());
          y2 = y1 + j * sign;
        } else {
          y2 = $gameMap.roundPYWithDirection(y1, dir, this.moveTiles());
          x2 = x1 + j * sign;
        }
        var pass = this.canPixelPass(x2, y2, 5);
        if (pass) break;
      }
      if (pass) break;
    }
    if (pass) {
      var collider = this.collider();
      var x3 = $gameMap.roundPXWithDirection(x1, dir, this.moveTiles());
      var y3 = $gameMap.roundPYWithDirection(y1, dir, this.moveTiles());
      collider.moveto(x3, y3);
      var self = this;
      var events = $gameMap.getCharactersAt(collider, function(e) {
        return (e === self || e.constructor === Game_Follower ||
          e.constructor === Game_Vehicle || e._erased ||
          !/<nosmartdir>/i.test(e.notes()));
      });
      if (events.length > 0) {
        collider.moveto(x1, y1);
        return;
      }
      this._realPX = this._px;
      this._realPY = this._py;
      this._px = x2;
      this._py = y2;
      this._moveCount++;
      this.increaseSteps();
      //this._followers.addMove([horz, vert], this.realMoveSpeed());
      //this._diagonal = this.direction8(horz, vert);
    }
    pass;
  };

  Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    this.setMovementSuccess(this.canPixelPassDiagonally(this.px, this.py, horz, vert));
    var originalSpeed = this._moveSpeed;
    if (this._smartMoveSpeed) this.smartMoveSpeed([horz, vert], true);
    if (this.isMovementSucceeded()) {
      this._px = $gameMap.roundPXWithDirection(this._px, horz, this.moveTiles());
      this._py = $gameMap.roundPYWithDirection(this._py, vert, this.moveTiles());
      this._realPX = $gameMap.pxWithDirection(this._px, this.reverseDir(horz), this.moveTiles());
      this._realPY = $gameMap.pyWithDirection(this._py, this.reverseDir(vert), this.moveTiles());
      this._moveCount++;
      this.increaseSteps();
      if (this.constructor === Game_Player) {
        this._followers.addMove([horz, vert], this.realMoveSpeed());
      }
      this._diagonal = this.direction8(horz, vert);
    } else {
      this._diagonal = false;
    }
    if (this._direction === this.reverseDir(horz)) {
      this.setDirection(horz);
    }
    if (this._direction === this.reverseDir(vert)) {
      this.setDirection(vert);
    }
    this._moveSpeed = originalSpeed;

    if (!this.isMovementSucceeded() && this._smartMoveDir) {
      if (this.canPixelPass(this.px, this.py, horz)) {
        this.moveStraight(horz);
      } else if (this.canPixelPass(this.px, this.py, vert)) {
        this.moveStraight(vert);
      }
    }
  };

  Game_CharacterBase.prototype.fixedMove = function(dir, dist) {
    this.setMovementSuccess(this.canPixelPass(this.px, this.py, dir, dist));
    if (this.isMovementSucceeded()) {
      this.setDirection(dir);
      this._px = $gameMap.roundPXWithDirection(this._px, dir, dist);
      this._py = $gameMap.roundPYWithDirection(this._py, dir, dist);
      this._realPX = $gameMap.pxWithDirection(this._px, this.reverseDir(dir), dist);
      this._realPY = $gameMap.pyWithDirection(this._py, this.reverseDir(dir), dist);
      this._moveCount++;
      this.increaseSteps();
      this._diagonal = false;
      if (this.constructor === Game_Player) {
        this._followers.addMove(dir, this.realMoveSpeed(), dist);
      }
    } else {
      this.setDirection(dir);
      this.checkEventTriggerTouchFront(dir);
    }
  };

  Game_CharacterBase.prototype.fixedDiagMove = function(horz, vert, dist) {
    this.setMovementSuccess(this.canPixelPassDiagonally(this.px, this.py, horz, vert));
    if (this.isMovementSucceeded()) {
      this._px = $gameMap.roundPXWithDirection(this._px, horz, dist);
      this._py = $gameMap.roundPYWithDirection(this._py, vert, dist);
      this._realPX = $gameMap.pxWithDirection(this._px, this.reverseDir(horz), dist);
      this._realPY = $gameMap.pyWithDirection(this._py, this.reverseDir(vert), dist);
      this._moveCount++;
      this.increaseSteps();
      if (this.constructor === Game_Player) {
        this._followers.addMove([horz, vert], this.realMoveSpeed());
      }
      this._diagonal = this.direction8(horz, vert);
    } else {
      this._diagonal = false;
    }
    if (this._direction === this.reverseDir(horz)) {
      this.setDirection(horz);
    }
    if (this._direction === this.reverseDir(vert)) {
      this.setDirection(vert);
    }
  };

  Game_CharacterBase.prototype.fixedMoveBackward = function(dist) {
    var lastDirectionFix = this.isDirectionFixed();
    this.setDirectionFix(true);
    this.fixedMove(this.reverseDir(this.direction()), dist);
    this.setDirectionFix(lastDirectionFix);
  };

  Game_CharacterBase.prototype.arc = function(px, py, dRad, cc, frames) {
    var cc = cc ? 1 : -1;
    var dx = this._px - px;
    var dy = this._py - py;
    var rad = Math.atan2(-(dy), dx);
    rad += rad < 0 ? 2 * Math.PI : 0;
    var rl = Math.sqrt(dy * dy + dx * dx);
    this._dRad = dRad || 2 * Math.PI;
    this._currentRad = rad;
    this._targetRad  = rad + this._dRad * cc;
    this._piviotX = px;
    this._piviotY = py;
    this._radiusL = this._radiusH = rl;
    this._angularSpeed = frames ? this._dRad / frames : null;
  };

  Game_CharacterBase.prototype.smartMoveSpeed = function(dir, diag) {
    while (!this.isMovementSucceeded() ) {
      if (this._moveSpeed < 1) break;
      this._moveSpeed--;
      if (diag){
        this.setMovementSuccess(this.canPixelPassDiagonally(this.px, this.py, dir[0], dir[1]));
      } else {
        this.setMovementSuccess(this.canPixelPass(this.px, this.py, dir));
      }
    }
  };

  Game_CharacterBase.prototype.reloadBoxes = function() {
    delete this._collider;
    this.collider();
    $gameMap.updateCharacterGrid(this, []);
    this._gridPosition = this.collider().gridEdge();
  };

  Game_CharacterBase.prototype.collider = function(direction) {
    var direction = direction || this._direction;
    if (!this._collider) this.setupCollider();
    return this._collider[direction] || this._collider[5];
  };

  Game_CharacterBase.prototype.changeCollider = function(shape, width, height, ox, oy) {
    var collider;
    if (shape === "box")    collider = new Box_Collider(width, height, ox, oy);
    if (shape === "circle") collider = new Circle_Collider(width, height, ox, oy);
    this._collider = [];
    this._collider[5] = collider;
    this._collider[5].moveto(this.px, this.py);
  };

  Game_CharacterBase.prototype.resetCollider = function() {
    this.setupCollider();
  };

  Game_CharacterBase.prototype.setupCollider = function() {
    this._collider = [];
    if (this.constructor === Game_Player || this.constructor === Game_Follower) {
      var box  = Movement.playerBox;
      var note = this.notes();
    } else if (this.constructor === Game_Event) {
      var box  = Movement.eventBox;
      var note = this.comments();
    } else if (this.constructor === Game_Vehicle) {
      if (this.isBoat()) {
        var box = Movement.boatBox;
      } else if (this.isShip()) {
        var box = Movement.shipBox;
      } else if (this.isAirship()) {
        var box = Movement.airshipBox;
      }
    } else {
      var box = Movement.eventBox;
    }
    if (note) {
      var multibox = /<collider>([\s\S]*)<\/collider>/.exec(note);
      if (!multibox) {
        multibox  = /<bbox>([\s\S]*)<\/bbox>/.exec(note);
        var oldmulti = true;
      }
      var singlebox = /<collider=(.*)>/.exec(note);
      if (!singlebox) {
        singlebox = /<bbox=(.*)>/.exec(note);
        var oldsingle = true;
      }
    }
    if (multibox) {
      var multi = Movement.stringToObjAry(multibox[1]);
      var boxW  = box[0] || 0;
      var boxH  = box[1] || 0;
      var boxOX = box[2] || 0;
      var boxOY = box[3] || 0;
      this._collider[5] = new Box_Collider(boxW, boxH, boxOX, boxOY, this.shiftY());
      for (var key in multi) {
        if (multi.hasOwnProperty(key)) {
          var box = multi[key];
          var t = "box";
          var i = 0;
          if (!oldmulti) {
            var t = box[0].toLowerCase();
            var i = 1;
          }
          var w  = box[0 + i] || boxW;
          var h  = box[1 + i] || boxH;
          var ox = typeof box[2 + i] === 'number' ? box[2 + i] : boxOX;
          var oy = typeof box[3 + i] === 'number'  ? box[3 + i] : boxOY;
          if (t === "box") {
            this._collider[key] = new Box_Collider(w, h, ox, oy, this.shiftY());
          } else if (t === "circle"){
            this._collider[key] = new Circle_Collider(w, h, ox, oy, this.shiftY());
          }
        }
      }
      this.moveAllBoxes(this.px, this.py);
    } else {
      var boxW  = box[0] || 0;
      var boxH  = box[1] || 0;
      var boxOX = box[2] || 0;
      var boxOY = box[3] || 0;
      var t = "box";
      var i = 0;
      if (singlebox) {
        var newBox = Movement.stringToAry(singlebox[1]);
        if (!oldsingle) {
          var t = newBox[0].toLowerCase();
          var i = 1;
        }
        boxW  = newBox[0 + i] || boxW;
        boxH  = newBox[1 + i] || boxH;
        boxOX = typeof newBox[2 + i] === 'number' ? newBox[2 + i] : boxOX;
        boxOY = typeof newBox[3 + i] === 'number' ? newBox[3 + i] : boxOY;
      }
      if (t === "box") {
        this._collider[5] = new Box_Collider(boxW, boxH, boxOX, boxOY, this.shiftY());
      } else if (t === "circle") {
        this._collider[5] = new Circle_Collider(boxW, boxH, boxOX, boxOY, this.shiftY());
      }
      this._collider[5].moveto(this.px, this.py);
    }
  }

  Game_CharacterBase.prototype.moveAllBoxes = function(newX, newY) {
    newX = typeof newX === 'number' ? newX : this.px;
    newY = typeof newY === 'number' ? newY : this.py;
    for (var i = 0; i < this._collider.length; i++) {
      if (this._collider[i]) this._collider[i].moveto(newX, newY);
    }
  };

  Game_CharacterBase.prototype.copyCollider = function() {
    var w = this.collider().width;
    var h = this.collider().height;
    var ox = this.collider().ox;
    var oy = this.collider().oy;
    if (this.collider().isCircle()) {
      var collider = new Circle_Collider(w, h, ox, oy, this.shiftY());
    } else {
      var collider = new Box_Collider(w, h, ox, oy, this.shiftY());
    }
    collider.moveto(this.px, this.py);
    return collider;
  };

  Game_CharacterBase.prototype.cx = function() {
    return this.collider().center.x;
  };

  Game_CharacterBase.prototype.cy = function() {
    return this.collider().center.y;
  };

  //-----------------------------------------------------------------------------
  // Game_Character
  //
  // The superclass of Game_Player, Game_Follower, GameVehicle, and Game_Event.

  var Alias_Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
  Game_Character.prototype.processMoveCommand = function(command) {
    var gc = Game_Character;
    var params = command.parameters;
    if (command.code === "fixedMove") {
      this.fixedMove(params[0], params[1]);
      return;
    }
    if (command.code === "fixedMoveForward") {
      this.fixedMove(this.direction(), params[0]);
      return;
    }
    if (command.code === "fixedMoveBackward") {
      this.fixedMoveBackward(params[0]);
      return;
    }
    if (command.code === "arc") {
      this.arc(params[0], params[1], params[2], params[3]);
      return;
    }
    if (command.code === gc.ROUTE_SCRIPT) {
      var mmove = /mmove\((.*)\)/i.exec(params[0]);
      var qmove = /qmove\((.*)\)/i.exec(params[0]);
      var arc   = /arc\((.*)\)/i.exec(params[0]);
      var arcTo = /arcto\((.*)\)/i.exec(params[0]);
      if (mmove) return this.subMmove(mmove[1]);
      if (qmove) return this.subQmove(qmove[1]);
      if (arc)   return this.subArc(arc[1]);
      if (arcTo) return this.subArcTo(arcTo[1]);
    }
    Alias_Game_Character_processMoveCommand.call(this, command);
  };

  Game_Character.prototype.subArc = function(settings) {
    var cmd = {};
    cmd.code = "arc";
    cmd.parameters = Movement.stringToAry(settings);
    this._moveRoute.list.splice(this._moveRouteIndex + 1, 0, cmd);
    this._moveRoute.list.splice(this._moveRouteIndex, 1);
    this._moveRouteIndex--;
  };

  Game_Character.prototype.subArcTo = function(settings) {
    settings = Movement.stringToAry(settings);
    if (settings.constructor !== Array) settings = [Number(settings)];
    var chara = settings.shift();
    chara = chara === 0 ? $gamePlayer : $gameMap.event(chara);
    var x = chara._px;
    var y = chara._py;
    settings.unshift(y);
    settings.unshift(x);
    var cmd = {};
    cmd.code = "arc";
    cmd.parameters = settings;
    this._moveRoute.list.splice(this._moveRouteIndex + 1, 0, cmd);
    this._moveRoute.list.splice(this._moveRouteIndex, 1);
    this._moveRouteIndex--;
  };

  Game_Character.prototype.subMmove = function(settings) {
    var move = {
      2: Game_Character.ROUTE_MOVE_DOWN,     4: Game_Character.ROUTE_MOVE_LEFT,
      6: Game_Character.ROUTE_MOVE_RIGHT,    8: Game_Character.ROUTE_MOVE_UP,
      1: Game_Character.ROUTE_MOVE_LOWER_L,  3: Game_Character.ROUTE_MOVE_LOWER_R,
      7: Game_Character.ROUTE_MOVE_UPPER_L,  9: Game_Character.ROUTE_MOVE_UPPER_R
    }
    settings = Movement.stringToAry(settings);
    var dir  = settings[0];
    var amt  = settings[1];
    var mult = settings[2] || 1;
    var tot  = amt * mult;
    for (var i = 0; i <= tot; i++) {
      var cmd  = {};
      cmd.code = move[dir];
      this._moveRoute.list.splice(this._moveRouteIndex + 1, 0, cmd);
    }
    this._moveRoute.list.splice(this._moveRouteIndex, 1);
    this._moveRouteIndex--;
  };

  Game_Character.prototype.subQmove = function(settings) {
    var move = {
      2: Game_Character.ROUTE_MOVE_DOWN,     4: Game_Character.ROUTE_MOVE_LEFT,
      6: Game_Character.ROUTE_MOVE_RIGHT,    8: Game_Character.ROUTE_MOVE_UP,
      1: Game_Character.ROUTE_MOVE_LOWER_L,  3: Game_Character.ROUTE_MOVE_LOWER_R,
      7: Game_Character.ROUTE_MOVE_UPPER_L,  9: Game_Character.ROUTE_MOVE_UPPER_R,
      5: Game_Character.ROUTE_MOVE_FORWARD,  0: Game_Character.ROUTE_MOVE_BACKWARD
    }
    settings  = Movement.stringToAry(settings);
    var dir   = settings[0];
    var amt   = settings[1];
    var multi = settings[2] || 1;
    var tot   = amt * multi;
    var steps = Math.floor(tot / this.moveTiles());
    var moved = 0;
    for (var i = 0; i < steps; i++) {
      moved += this.moveTiles();
      var cmd  = {};
      cmd.code = move[dir];
      this._moveRoute.list.splice(this._moveRouteIndex + 1, 0, cmd);
    }
    if (moved < tot) {
      var cmd = {};
      cmd.code = "fixedMove";
      cmd.parameters = [dir, tot - moved];
      this._moveRoute.list.splice(this._moveRouteIndex + 1 + i, 0, cmd);
    }
    this._moveRoute.list.splice(this._moveRouteIndex, 1);
    this._moveRouteIndex--;
  };

  Game_Character.prototype.deltaPXFrom = function(x) {
      return $gameMap.deltaPX(this.cx(), x);
  };

  Game_Character.prototype.deltaPYFrom = function(y) {
      return $gameMap.deltaPY(this.cy(), y);
  };

  Game_Character.prototype.pixelDistanceFrom = function(x, y) {
    return $gameMap.distance(this.cx(), this.cy(), x, y);
  };

  Game_Character.prototype.pixelDistanceFromWithBox = function(other) {
    // to do or not, not really needed
  };

  Game_Character.prototype.moveRandom = function() {
    var d = 2 + Math.randomInt(4) * 2;
    if (this.canPixelPass(this.px, this.py, d)) {
      this.moveStraight(d);
    }
  };

  Game_Character.prototype.moveTowardCharacter = function(character) {
    var sx = this.cx() - character.cx();
    var sy = this.cy() - character.cy();
    sx = Math.abs(sx) < this.moveTiles() ? 0 : sx;
    sy = Math.abs(sy) < this.moveTiles() ? 0 : sy;
    if (Math.abs(sx) > Math.abs(sy)) {
      this.moveStraight(sx > 0 ? 4 : 6);
      if (!this.isMovementSucceeded() && sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
      }
    } else if (sy !== 0) {
      this.moveStraight(sy > 0 ? 8 : 2);
      if (!this.isMovementSucceeded() && sx !== 0) {
        this.moveStraight(sx > 0 ? 4 : 6);
      }
    }
  };

  Game_Character.prototype.moveAwayFromCharacter = function(character) {
    var sx = this.deltaPXFrom(character.cx());
    var sy = this.deltaPYFrom(character.cy());
    sx = Math.abs(sx) < this.moveTiles() ? 0 : sx;
    sy = Math.abs(sy) < this.moveTiles() ? 0 : sy;
    if (sx != 0 && sy != 0 && Movement.diagonal) {
      this.moveDiagonally(sx > 0 ? 6 : 4, sy > 0 ? 2 : 8);
    } else if (Math.abs(sx) > Math.abs(sy)) {
      this.moveStraight(sx > 0 ? 6 : 4);
      if (!this.isMovementSucceeded() && sy !== 0) {
        this.moveStraight(sy > 0 ? 2 : 8);
      }
    } else if (sy !== 0) {
      this.moveStraight(sy > 0 ? 2 : 8);
      if (!this.isMovementSucceeded() && sx !== 0) {
        this.moveStraight(sx > 0 ? 6 : 4);
      }
    }
  };

  Game_Character.prototype.turnTowardCharacter = function(character) {
    var sx = this.deltaPXFrom(character.cx());
    var sy = this.deltaPYFrom(character.cy());
    if (Math.abs(sx) > Math.abs(sy)) {
      this.setDirection(sx > 0 ? 4 : 6);
    } else if (sy !== 0) {
      this.setDirection(sy > 0 ? 8 : 2);
    }
  };

  Game_Character.prototype.turnAwayFromCharacter = function(character) {
    var sx = this.deltaPXFrom(character.cx());
    var sy = this.deltaPYFrom(character.cy());
    if (Math.abs(sx) > Math.abs(sy)) {
      this.setDirection(sx > 0 ? 6 : 4);
    } else if (sy !== 0) {
      this.setDirection(sy > 0 ? 2 : 8);
    }
  };

  Game_Character.prototype.directionTowards = function(x1, y1) {
    var x2 = this.cx();
    var y2 = this.cy();
    var radian = Math.atan2(-(y1 - y2), x1 - x2);
    radian += radian < 0 ? 2 * Math.PI : 0;
    return this.radianToDirection(radian, true);
  };

  Game_Character.prototype.radianToDirection = function(radian, useDiag) {
    if (Movement.diagonal && useDiag) {
      if (radian >= Math.PI / 6 && radian < Math.PI / 3) {
        return 9;
      } else if (radian >= 2 * Math.PI / 3 && radian < 5 * Math.PI / 6) {
        return 7;
      } else if (radian >= 7 * Math.PI / 6 && radian < 4 * Math.PI / 3) {
        return 1;
      } else if (radian >= 5 * Math.PI / 3 && radian < 11 * Math.PI / 6) {
        return 3;
      }
    }
    if (radian >= 0 && radian < Math.PI / 4) {
      return 6;
    } else if (radian >= Math.PI / 4 && radian < 3 * Math.PI / 4) {
      return 8;
    } else if (radian >= 3 * Math.PI / 4 && radian < 5 * Math.PI / 4) {
      return 4;
    } else if (radian >= 5 * Math.PI / 4 && radian < 7 * Math.PI / 4) {
      return 2;
    } else if (radian >= 7 * Math.PI / 4) {
      return 6;
    }
  };

  Game_Character.prototype.directionToRadian = function(direction) {
    if (direction === 6) return 0;
    if (direction === 8) return Math.PI / 2;
    if (direction === 4) return Math.PI;
    if (direction === 2) return 3 * Math.PI / 2;
  };

  Game_Character.prototype.reverseRadian = function(radian) {
    radian -= Math.PI;
    radian += radian < 0 ? 2 * Math.PI : 0;
    return radian;
  };

  Game_Character.prototype.startPathFind = function(goalX, goalY) {
    this._pathFind = null;
    var ox  = this.cx() % this.moveTiles();
    var ox2 = goalX % this.moveTiles();
    var oy  = this.cy() % this.moveTiles();
    var oy2 = goalY % this.moveTiles();
    var sx  = this.deltaPXFrom(goalX);
    var sy  = this.deltaPYFrom(goalY);
    var dir;
    if (Math.abs(sx) > Math.abs(sy)) {
      goalX = goalX - ox2 + ox;
      sx = this.deltaPXFrom(goalX);
      sy = 0;
    } else if (Math.abs(sx) < Math.abs(sy)) {
      goalY = goalY - oy2 + oy;
      sy = this.deltaPYFrom(goalY);
      sx = 0;
    } else {
      sx = sy = 0;
    }
    if (Math.abs(sx) > Math.abs(sy)) {
      dir = sx > 0 ? 4 : 6;
    } else if (sy !== 0) {
      dir = sy > 0 ? 8 : 2;
    }
    return dir;
  };

  Game_Character.prototype.updatePathFind = function() {
    // For pathfind addon
  };

  Game_Event.prototype.canMove = function() {
    return !this._locked;
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //
  // The game object class for the player. It contains event starting
  // determinants and map scrolling functions.

  Game_Player.prototype.actor = function() {
    return $gameParty.leader();
  };

  Game_Player.prototype.canClick = function() {
    return true; // For ABS mainly, sets to false if you are over a window
  }

  Game_Player.prototype.locate = function(x, y) {
    Game_Character.prototype.locate.call(this, x, y);
    this.center(x, y);
    this.makeEncounterCount();
    if (this.isInVehicle()) this.vehicle().refresh();
    this._followers.synchronize(this);
  };

  Game_Player.prototype.moveByInput = function() {
    if (!this.startedMoving() && this.canMove()) {
      if (this.triggerAction()) return;
      var direction = Input.dir8;
      if (direction > 0) {
        $gameTemp.clearDestination();
        this._pathFind = null;
      } else if ($gameTemp.isDestinationValid()) {
        if (!Movement.moveOnClick) {
          $gameTemp.clearDestination();
          return;
        }
        var x = $gameTemp.destinationPX();
        var y = $gameTemp.destinationPY();
        if (!this._pathFind) direction = this.startPathFind(x, y);
      }
      if ([2, 4, 6, 8].contains(direction)){
        this.moveStraight(direction);
      } else if ([1, 3, 7, 9].contains(direction) && Movement.diagonal){
        var diag = {1: [4, 2], 3: [6, 2], 7: [4, 8], 9: [6, 8]};
        this.moveDiagonally(diag[direction][0], diag[direction][1]);
      }
    }
  };

  var Alias_Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function() {
    this.reloadBoxes();
    Alias_Game_Player_refresh.call(this);
  };

  Game_Player.prototype.update = function(sceneActive) {
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    var wasMoving = this.isMoving();
    this.updateDashing();
    if (sceneActive) {
      this.moveByInput();
      if (!this.startedMoving() && this.canMove()) this.updatePathFind();
    }
    Game_Character.prototype.update.call(this);
    this.updateScroll(lastScrolledX, lastScrolledY);
    this.updateVehicle();
    if (!this.startedMoving() && !this.isMoving()) this.updateNonmoving(wasMoving);
    this._followers.update();
  };

  Game_Player.prototype.updateNonmoving = function(wasMoving) {
    if (!$gameMap.isEventRunning()) {
      if (wasMoving) {
        if (this._freqCount >= this.freqThreshold()) {
          $gameParty.onPlayerWalk();
        }
        this.checkEventTriggerHere([1,2]);
        if ($gameMap.setupStartingEvent()) return;
      }
      if (this.triggerAction()) return;
      if (wasMoving) {
        if (this._freqCount >= this.freqThreshold()) {
          this.updateEncounterCount();
          this._freqCount = 0;
        }
      } else {
        $gameTemp.clearDestination();
      }
    }
  };

  Game_Player.prototype.updateDashing = function() {
    if (this.startedMoving()) return;
    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
      this._dashing = this.isDashButtonPressed() || $gameTemp.isDestinationValid();
    } else {
      this._dashing = false;
    }
  };

  Game_Player.prototype.updateVehicle = function() {
    if (this.isInVehicle() && !this.areFollowersGathering()) {
      if (this._vehicleGettingOn) {
        this.updateVehicleGetOn();
      } else if (this._vehicleGettingOff) {
        this.updateVehicleGetOff();
      } else {
        if (this._vehicleSyncd) {
          this.vehicle().syncWithPlayer();
        } else {
          this.copyPosition(this.vehicle());
          this._vehicleSyncd = true;
        }
      }
    }
  };

  Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
    if (!$gameMap.isEventRunning()) {
      var collider = this.collider();
      var x1 = this._px;
      var y1 = this._py;
      collider.moveto(x, y);
      var self = this;
      var events = $gameMap.getCharactersAt(collider, function(e) {
        return (e === self || e.constructor === Game_Follower ||
          e.constructor === Game_Vehicle || e._erased);
      });
      collider.moveto(x1, y1);
      if (events.length === 0) return;
      var cx = this.cx();
      var cy = this.cy();
      events.sort(function(a, b) {
        return a.pixelDistanceFrom(cx, cy) - b.pixelDistanceFrom(cx, cy);
      });
      var event = events[0];
      if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
        event.start();
      }
    }
  };

  Game_Player.prototype.triggerTouchAction = function() {
    if ($gameTemp.isDestinationValid()) {
      var x1 = $gameTemp.destinationX();
      var y1 = $gameTemp.destinationY();
      var dx = Math.floor(Math.abs(Math.round(this.x) - x1));
      var dy = Math.floor(Math.abs(Math.round(this.y) - y1));
      var dir = this.directionTowards($gameTemp.destinationPX(), $gameTemp.destinationPY());
      if (dir !== this.direction()) return;
      if (dx === 0 && dy === 0) {
        if (this.triggerTouchActionD1()) return true;
      }
      if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
        if (this.triggerTouchActionD2()) return true;
      }
      if ((dx === 2 && dy === 0) || (dx === 0 && dy === 2)) {
        if (this.checkCounter([0, 1, 2])) return true;
      }
    }
    return false;
  };

  Game_Player.prototype.triggerTouchActionD1 = function() {
    if (this.airshipHere()) {
      if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
        return true;
      }
    }
    this.checkEventTriggerHere([0]);
    return $gameMap.setupStartingEvent();
  };

  Game_Player.prototype.triggerTouchActionD2 = function() {
    if (this.shipBoatThere()) {
      if (TouchInput.isTriggered() && this.getOnVehicle()) {
        return true;
      }
    }
    if (this.isInBoat() || this.isInShip()) {
      if (TouchInput.isTriggered() && this.getOffVehicle()) {
        return true;
      }
    }
    this.checkEventTriggerThere([0,1,2]);
    return $gameMap.setupStartingEvent();
  };

  Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (this.canStartLocalEvents()) {
      this.startMapEvent(this.collider().x, this.collider().y, triggers, false);
    }
  };

  Game_Player.prototype.checkEventTriggerThere = function(triggers, x2, y2) {
    if (this.canStartLocalEvents()) {
      var direction = this.direction();
      var x1 = this.collider().x;
      var y1 = this.collider().y;
      x2 = x2 || $gameMap.roundPXWithDirection(x1, direction, this.moveTiles());
      y2 = y2 || $gameMap.roundPYWithDirection(y1, direction, this.moveTiles());
      this.startMapEvent(x2, y2, triggers, true);
      if ($gameMap.isAnyEventStarting) {
        var es = $gameMap.isAnyEventStarting();
      } else if ($gameMap.someEventStarting) {
        var es = $gameMap.someEventStarting();
      } else {
        var es = true;
        alert("Please inform Quasi that you do not have a 'isAnyEventStarting' function");
      }
      if (!es) {
        return this.checkCounter(triggers);
      }
    }
  };

  Game_Player.prototype.checkCounter = function(triggers, x2, y2) {
    var direction = this.direction();
    var x1 = this._px;
    var y1 = this._py;
    x2 = x2 || $gameMap.roundPXWithDirection(x1, direction, this.moveTiles());
    y2 = y2 || $gameMap.roundPYWithDirection(y1, direction, this.moveTiles());
    this.collider().moveto(x2, y2);
    var counters = $gameMap.getTileBoxesAt(this.collider(), function(tile) {
      if (!tile.isCounter) return true;
      return false;
    });
    this.collider().moveto(x1, y1);
    var counter = counters[0];
    if (counter) {
      if ([4, 6].contains(direction)) {
        var dist = Math.abs(counter.center.x - this.cx());
        dist += this.collider().width;
      }  else if ([8, 2].contains(direction)) {
        var dist = Math.abs(counter.center.y - this.cy());
        dist += this.collider().height;
      }
      var x3 = $gameMap.roundPXWithDirection(x1, direction, dist);
      var y3 = $gameMap.roundPYWithDirection(y1, direction, dist);
      return this.startMapEvent(x3, y3, triggers, true);
    }
    return false;
  };

  Game_Player.prototype.getOnVehicle = function() {
    var direction = this.direction();
    var airship = this.airshipHere();
    if (airship) {
      this._vehicleType = "airship";
    } else {
      var vehicle = this.shipBoatThere();
      if (vehicle) {
        this._vehicleType = vehicle._type;
        this._passabilityLevel = vehicle._type === "boat" ? 1 : 2;
      }
    }
    if (this.isInVehicle()) {
      this._vehicleGettingOn = true;
      this._vehicleSyncd = false;
      if (!this.isInAirship()) {
        this.setThrough(true);
        var cx = this.cx();
        var cy = this.cy();
        if ([4, 6].contains(direction)) {
          var dist = Math.abs($gameMap.deltaPX(cx, this.vehicle().cx()));
          this.fixedMove(direction, dist);
        } else if ([8, 2].contains(direction)) {
          var dist = Math.abs($gameMap.deltaPY(cy, this.vehicle().cy()));
          this.fixedMove(direction, dist);
        }
        this.setThrough(false);
      }
      this.gatherFollowers();
    }
    return this._vehicleGettingOn;
  };

  Game_Player.prototype.airshipHere = function() {
    var airship;
    var collider = this.collider();
    var airship = $gameMap.getCharactersAt(collider, function(e) {
      if (e.constructor !== Game_Vehicle) return true;
      return (!e.isAirship() || !e.isOnMap());
    });
    collider.moveto(this.px, this.py);
    return airship[0];
  };

  Game_Player.prototype.shipBoatThere = function(x2, y2) {
    var direction = this.direction();
    var x1 = this.collider().x;
    var y1 = this.collider().y;
    x2 = x2 || $gameMap.roundPXWithDirection(x1, direction, this.moveTiles() + 4);
    y2 = y2 || $gameMap.roundPYWithDirection(y1, direction, this.moveTiles() + 4);
    var collider = this.collider();
    collider.moveto(x2, y2)
    var vehicles = $gameMap.getCharactersAt(collider, function(e) {
      if (e.constructor !== Game_Vehicle) return true;
      return (e.isAirship() || !e.isOnMap());
    });
    collider.moveto(this.px, this.py);
    if (vehicles.length === 0) return false;
    var cx = this.cx();
    var cy = this.cy();
    vehicles.sort(function(a, b) {
      return a.pixelDistanceFrom(cx, cy) - b.pixelDistanceFrom(cx, cy);
    });
    return vehicles[0];
  };

  Game_Player.prototype.getOffVehicle = function() {
    this._vehicleSyncd = false;
    this._passabilityLevel = 5;
    this.setThrough(false);
    this.moveAllBoxes(this.px, this.py);
    var direction = this.direction();
    if (!Movement.offGrid) {
      dist = this.moveTiles();
      if ([4, 6].contains(direction)) {
        if (this.vehicle().collider().width > this.moveTiles()) {
          var dist = this.vehicle().collider().width;
          dist += this.moveTiles() - this.vehicle().collider().width % this.moveTiles();
        }
      } else if ([8, 2].contains(direction)) {
        if (this.vehicle().collider().height > this.moveTiles()) {
          var dist = this.vehicle().collider().height;
          dist += this.moveTiles() - this.vehicle().collider().height % this.moveTiles();
        }
      }
    } else {
      if ([4, 6].contains(direction)) {
        var dist = this.vehicle().collider().ox - this.collider().ox;
        dist = this.collider().width + (direction === 4 ? -dist : dist);
      }  else if ([8, 2].contains(direction)) {
        var dist = this.vehicle().collider().oy - this.collider().oy;
        dist = this.collider().height + (direction === 8 ? -dist : dist);
      }
    }
    if (this.canPixelPass(this.px, this.py, direction, dist)) {
      if (this.isInAirship()) this.setDirection(2);
      this._followers.synchronize(this);
      this.vehicle().getOff();
      this._passabilityLevel = 0;
      var prevX = this.vehicle().collider().x;
      var prevY = this.vehicle().collider().y;
      if (!this.isInAirship()) {
        this.setThrough(true);
        this.fixedMove(direction, dist);
        this.vehicle().collider().moveto(prevX, prevY);
        this.setTransparent(false);
      }
      this._vehicleGettingOff = true;
      this.setMoveSpeed(4);
      this.setThrough(false);
      this.makeEncounterCount();
    } else {
      this._vehicleSyncd = true;
      this._passabilityLevel = this.vehicle()._type === "boat" ? 1 : 2;
      if (this.isInAirship()) {
        this.setThrough(true);
      }
    }
    return this._vehicleGettingOff;
  };

  Game_Player.prototype.isOnDamageFloor = function() {
    var boxes = $gameMap.getTileBoxesAt(this.collider(), function(tile) {
      if (!tile.isDamage) return true;
      return false;
    });
    if (boxes.length === 0) return false;
    var pass = 0;
    var vertices = this.collider().vertices();
    for (var i = 0; i < vertices.length; i++) {
      for (var j = 0; j < boxes.length; j++) {
        if (boxes[j].containsPoint(vertices[i].x, vertices[i].y)) {
          pass++;
        }
      }
    }
    return pass >= 4;
  };

  Game_Player.prototype.moveStraight = function(d) {
    Game_Character.prototype.moveStraight.call(this, d);
  };

  Game_Player.prototype.moveDiagonally = function(horz, vert) {
    Game_Character.prototype.moveDiagonally.call(this, horz, vert);
  };

  Game_Player.prototype.collider = function(direction) {
    if (this._vehicleSyncd) {
      return this.vehicle().collider(direction);
    } else {
      return Game_Character.prototype.collider.call(this, direction);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Follower
  //
  // The game object class for a follower. A follower is an allied character,
  // other than the front character, displayed in the party.

  var Alias_Game_Follower_initialize = Game_Follower.prototype.initialize;
  Game_Follower.prototype.initialize = function(memberIndex) {
    Alias_Game_Follower_initialize.call(this, memberIndex);
    this._moveList = [];
  };

  Game_Follower.prototype.update = function() {
    Game_Character.prototype.update.call(this);
    this.setOpacity($gamePlayer.opacity());
    this.setBlendMode($gamePlayer.blendMode());
    this.setWalkAnime($gamePlayer.hasWalkAnime());
    this.setStepAnime($gamePlayer.hasStepAnime());
    this.setDirectionFix($gamePlayer.isDirectionFixed());
    this.setTransparent($gamePlayer.isTransparent());
  };

  Game_Follower.prototype.addMove = function(direction, speed, dist) {
    this._moveList.push([direction, speed, dist]);
  };

  Game_Follower.prototype.clearList = function() {
    this._moveList = [];
  };

  Game_Follower.prototype.updateMoveList = function(preceding, gathering) {
    if (this._moveList.length === 0 || this.startedMoving()) return;
    var move = this._moveList.shift();
    if (!gathering) {
      if (move[0].constructor === Array) {
        var collided = this.collideWithPreceding(preceding, move[0][0]) &&
                       this.collideWithPreceding(preceding, move[0][1]);
        this.collider(move[0][0]).moveto(this.px, this.py);
        this.collider(move[0][1]).moveto(this.px, this.py);
      } else {
        var collided = this.collideWithPreceding(preceding, move[0], move[2]);
        this.collider(move[0]).moveto(this.px, this.py);
      }
      if (collided) {
        this._moveList.unshift(move);
        return;
      }
    }
    this.setMoveSpeed(move[1]);
    if (move[0].constructor === Array) {
      this.moveDiagonally(move[0][0], move[0][1]);
    } else {
      if (move[2]) {
        this.fixedMove(move[0], move[2]);
      } else {
        this.moveStraight(move[0]);
      }
    }
  };

  Game_Follower.prototype.collideWithPreceding = function(preceding, d, dist) {
    if (!this.isVisible()) return false;
    var dist = dist || this.moveTiles();
    var x1 = $gameMap.roundPXWithDirection(this.px, d, dist);
    var y1 = $gameMap.roundPYWithDirection(this.py, d, dist);
    var self = this;
    var charas = $gameMap.getCharactersAt(this.collider(d), function(chara) {
      if (chara === self || chara !== preceding ||
          chara._direction === self.reverseDir(self.direction()) ) {
        return true;
      }
      return false;
    });
    if (charas.length > 0) return true;
    this.collider(d).moveto(x1, y1);
    charas = $gameMap.getCharactersAt(this.collider(d), function(chara) {
      if (chara === self || chara !== preceding ||
          chara._direction === self.reverseDir(self.direction()) ) {
        return true;
      }
      return false;
    });
    this.collider(d).moveto(this.px, this.py);
    return charas.length > 0;
  };

  //-----------------------------------------------------------------------------
  // Game_Follower
  //
  // The game object class for a follower. A follower is an allied character,
  // other than the front character, displayed in the party.

  Game_Followers.prototype.update = function() {
    this.forEach(function(follower) {
        follower.update();
    }, this);
    for (var i = this._data.length - 1; i >= 0; i--) {
      var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
      this._data[i].updateMoveList(precedingCharacter, this._gathering);
    }
  };

  Game_Followers.prototype.addMove = function(direction, speed, dist) {
    for (var i = this._data.length - 1; i >= 0; i--) {
      this._data[i].addMove(direction, speed, dist);
    }
  };

  Game_Followers.prototype.synchronize = function(chara) {
    this.forEach(function(follower) {
      follower.copyPosition(chara);
      follower.straighten();
      follower.setDirection(chara.direction());
      follower.clearList();
    }, this);
  };

  Game_Followers.prototype.areGathering = function() {
    if (this.areGathered() && this._gathering) {
      this._gathering = false;
      return true;
    }
    return false;
  };

  Game_Followers.prototype.areGathered = function() {
    return this.visibleFollowers().every(function(follower) {
      return follower.cx() === $gamePlayer.cx() && follower.cy() === $gamePlayer.cy();
    }, this);
  };

  //-----------------------------------------------------------------------------
  // Game_Vehicle
  //
  // The game object class for a vehicle.

  var Alias_Game_Vehicle_refresh = Game_Vehicle.prototype.refresh;
  Game_Vehicle.prototype.refresh = function() {
    Alias_Game_Vehicle_refresh.call(this);
    this.setThrough(!this.isOnMap());
  };

  Game_Vehicle.prototype.isOnMap = function() {
    return this._mapId === $gameMap.mapId();
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  // The game object class for an event. It contains functionality for event page
  // switching and running parallel process events.

  Game_Event.prototype.updateStop = function() {
    if (!this.canMove()) {
      this._freqCount = this.freqThreshold();
      this.resetStopCount();
    }
    if (this._moveRouteForcing && this.canMove()) {
      this.updateRoutineMove();
    }
    if (!this.isMoveRouteForcing()) {
      this.updateSelfMovement();
    }
  };

  Game_Event.prototype.updateSelfMovement = function() {
    if (this.isNearTheScreen() && this.canMove()) {
      if (this._freqCount < this.freqThreshold()) {
        switch (this._moveType) {
        case 1:
          this.moveTypeRandom();
          break;
        case 2:
          this.moveTypeTowardPlayer();
          break;
        case 3:
          this.moveTypeCustom();
          break;
        }
      } else {
        this._stopCount++;
        if (this.checkStop(this.stopCountThreshold())) {
          this._stopCount = this._freqCount = 0;
        }
      }
    }
  };

  Game_Event.prototype.comments = function() {
    if (!this.page() || !this.list()) {
      return "";
    }
    var comments = this.list().filter(function(list) {
      return list.code === 108 || list.code === 408;
    });
    comments = comments.map(function(list) {
      return list.parameters;
    });
    return comments.join('\n');
  };

  var Alias_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function() {
    Alias_Game_Event_setupPageSettings.call(this);
    this.initialPosition();
    this.passabilityLevel(true);
    this._collider = null;
    this._randomDir = null;
  };

  Game_Event.prototype.initialPosition = function() {
    var ox = this.initialOffset().x;
    var oy = this.initialOffset().y;
    this.setPixelPosition(this.px + ox, this.py + oy);
  };

  Game_Event.prototype.initialOffset = function() {
    if (!this._initialOffset) {
      var ox = /<ox=(-?[0-9]*)>/.exec(this.comments());
      var oy = /<oy=(-?[0-9]*)>/.exec(this.comments());
      if (ox) ox = Number(ox[1] || 0);
      if (oy) oy = Number(oy[1] || 0);
      this._initialOffset = new Point(ox || 0 , oy || 0);
    }
    return this._initialOffset;
  };

  Game_Event.prototype.passabilityLevel = function(reset) {
    if (reset) {
      var lvl = /<pl=(\d*)>/.exec(this.comments());
      if (lvl) {
        this.setPassability(Number(lvl[1] || 0));
      } else {
        this.setPassability(0);
      }
    }
    return this._passabilityLevel;
  };

  Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
    if (!$gameMap.isEventRunning()) {
      if (this._trigger === 2 && !this.isJumping() && this.isNormalPriority()) {
        var prevX = this.collider().x;
        var prevY = this.collider().y;
        this.collider().moveto(x, y);
        var self = this;
        var charas = $gameMap.getCharactersAt(this.collider(), function(chara) {
          if (chara.constructor !== Game_Player) return true;
          return false;
        });
        this.collider().moveto(prevX, prevY);
        if (charas.length > 0) {
          this._stopCount = 0;
          this._freqCount = this.freqThreshold();
          this.start();
        }
      }
    }
  };

  Game_Event.prototype.moveTypeRandom = function() {
    if (this._freqCount === 0 || !this._randomDir) {
      this._randomDir = 2 * (Math.randomInt(4) + 1);
    }
    if (!this.canPixelPass(this.px, this.py, this._randomDir)) {
      this._randomDir = 2 * (Math.randomInt(4) + 1);
    }
    this.moveStraight(this._randomDir);
  };

  Game_Event.prototype.moveTypeTowardPlayer = function() {
    if (this.isNearThePlayer()) {
      if (this._freqCount === 0 || !this._typeTowardPlayer) {
        this._typeTowardPlayer = Math.randomInt(6);
      }
      switch (this._typeTowardPlayer) {
      case 0: case 1: case 2: case 3:
        this.moveTowardPlayer();
        break;
      case 4:
        this.moveTypeRandom();
        break;
      case 5:
        this.moveForward();
        break;
      }
    } else {
      this.moveTypeRandom();
    }
  };


  //-----------------------------------------------------------------------------
  // Scene_Map
  //
  // The scene class of the map screen.

  Scene_Map.prototype.processMapTouch = function() {
    if ((TouchInput.isTriggered() || this._touchCount > 0) && $gamePlayer.canClick()) {
      if (TouchInput.isPressed()) {
        if (this._touchCount === 0 || this._touchCount >= 15) {
          var x = $gameMap.canvasToMapPX(TouchInput.x);
          var y = $gameMap.canvasToMapPY(TouchInput.y);
          if (!Movement.offGrid) {
            var ox  = x % Movement.tileSize;
            var oy  = y % Movement.tileSize;
            x += Movement.tileSize / 2 - ox;
            y += Movement.tileSize / 2 - oy;
          }
          $gameTemp.setPixelDestination(x, y);
        }
        this._touchCount++;
      } else {
        this._touchCount = 0;
      }
    }
  };

  Scene_Map.prototype.addTempCollider = function(collider, duration, clearable) {
    this._spriteset.addTempCollider(collider, duration || 60, clearable);
  };

  Scene_Map.prototype.removeTempCollider = function(collider) {
    this._spriteset.removeTempCollider(collider);
  };

  Input.keyMapper[121] = 'f10';
  var Alias_Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function() {
    Alias_Scene_Map_updateMain.call(this);
    var key = Imported.Quasi_Input ? "#f10" : "f10";
    if ($gameTemp.isPlaytest() && Input.isTriggered(key)) {
      Movement.showBoxes = !Movement.showBoxes;
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_Collider
  //
  // The sprite for displaying a collider.

  Sprite_Collider.prototype = Object.create(Sprite.prototype);
  Sprite_Collider.prototype.constructor = Sprite_Collider;

  Sprite_Collider.prototype.initialize = function(collider) {
    Sprite.prototype.initialize.call(this);
    this.setupCollider(collider);
    this.z = 7;
    this.alpha = 100/255;
    this._duration;
    this.updatePos = true;
  };

  Sprite_Collider.prototype.setupCollider = function(collider) {
    this._collider = collider;
    if (this._colliderSprite) this.removeChild(this._colliderSprite);
    this._colliderSprite = new PIXI.Graphics();
    this.drawCollider();
    this.addChild(this._colliderSprite);
    return this._colliderSprite;
  };

  Sprite_Collider.prototype.drawCollider = function() {
    var collider = this._collider;
    this._colliderSprite.clear();
    this._color = typeof collider.color === "undefined" ? 0xff0000 : collider.color;
    this._colliderSprite.beginFill(this._color);
    if (collider.isCircle()) {
      var radiusX = collider.radiusX;
      var radiusY = collider.radiusY;
      this._colliderSprite.drawEllipse(0, 0, radiusX, radiusY);
      this._colliderSprite.rotation = collider.radian;
    } else {
      this._colliderSprite.drawPolygon(collider.baseVertices);
    }
    this._colliderSprite.endFill();
    if (!Imported.Quasi_Stage) this._colliderSprite.cacheAsBitmap = true;
  };

  Sprite_Collider.prototype.setDuration = function(duration) {
    this._duration = duration;
  };

  Sprite_Collider.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._colliderSprite.visible) this.checkChanges();
    if (this._duration && this._duration > 0) this._duration--;
  };

  Sprite_Collider.prototype.isPlaying = function() {
    return this._duration > 0;
  };

  Sprite_Collider.prototype.checkChanges = function() {
    if (this.updatePos) {
      this.x = this._collider.x + this._collider.offsetX();
      this.x -= $gameMap.displayX() * Movement.tileSize;
      this.y = this._collider.y + this._collider.offsetY();
      this.y -= $gameMap.displayY() * Movement.tileSize;
    }
    if (this._cachedw !== this._collider.width ||
        this._cachedh !== this._collider.height) {
      this._cachedw = this._collider.width;
      this._cachedh = this._collider.height;
      this.drawCollider();
    }
    if (typeof this._collider.color !== "undefined" && this._color !== this._collider.color) {
      this.drawCollider();
    }
    this._colliderSprite.z = this.z;
  };

  //-----------------------------------------------------------------------------
  // Sprite_Destination
  //
  // The sprite for displaying the destination place of the touch input.

  Sprite_Destination.prototype.updatePosition = function() {
    var tileWidth = $gameMap.tileWidth();
    var tileHeight = $gameMap.tileHeight();
    var x = $gameTemp.destinationPX();
    var y = $gameTemp.destinationPY();
    this.x = $gameMap.adjustPX(x);
    this.y = $gameMap.adjustPY(y);
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //
  // The sprite for displaying a character.

  var Alias_Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    Alias_Sprite_Character_update.call(this);
    if ($gameTemp.isPlaytest()) this.updateColliders();
  };

  Sprite_Character.prototype.updateColliders = function() {
    if (!this.bitmap.isReady()) return;
    if (this._colliderData !== this._character.collider()) this.createColliders();
    if (!this._colliderSprite) return;
    if (this._character.constructor == Game_Follower){
      this._colliderSprite.visible = this._character.isVisible() && Movement.showBoxes;
    } else {
      this._colliderSprite.visible = this.visible && Movement.showBoxes;
    }
  };

  Sprite_Character.prototype.createColliders = function() {
    if (this._character.collider().constructor === Object) return;
    this._colliderData = this._character.collider();
    if (!this._colliderSprite) {
      this._colliderSprite = new Sprite_Collider(this._colliderData);
      this.parent.addChild(this._colliderSprite);
      return;
    }
    this._colliderSprite.setupCollider(this._colliderData);
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //
  // The set of sprites on the map screen.

  var Alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    Alias_Spriteset_Map_createLowerLayer.call(this);
    if ($gameTemp.isPlaytest()) {
      this.createTileBoxes();
      this._tempColliders = [];
    }
  };

  Spriteset_Map.prototype.createTileBoxes = function() {
    if (!$gameTemp.isPlaytest()) return;
    this._collisionmap = new Sprite();
    this._collisionmap.bitmap = Movement._collisionmap;
    this._collisionmap.opacity = 100;
    this.addChild(this._collisionmap);
    this._regionmap = new Sprite();
    this._regionmap.bitmap = Movement._regionmap;
    this._collisionmap.addChild(this._regionmap);
  };

  Spriteset_Map.prototype.addTempCollider = function(collider, duration, clearable) {
    if (!this._tempColliders) return;
    var i, j;
    for (i = 0, j = this._tempColliders.length; i < j; i++) {
      if (this._tempColliders[i].sprite.collider === collider) {
        this._tempColliders[i].sprite.setDuration(duration);
        return;
      }
    }
    var temp = {};
    temp.clearable = clearable;
    temp.sprite = new Sprite_Collider(collider);
    temp.sprite.collider = collider;
    temp.sprite.setDuration(duration);
    temp.sprite.visible = false;
    this._tempColliders.push(temp);
    this._tilemap.addChild(temp.sprite);
  };

  Spriteset_Map.prototype.removeTempCollider = function(collider) {
    if (!this._tempColliders || this._tempColliders.length === 0) {
      return;
    }
    for (var i = 0, j = this._tempColliders.length - 1; i >= 0; i--) {
      if (this._tempColliders[i].sprite.collider === collider) {
        this._tilemap.removeChild(this._tempColliders[i].sprite);
        this._tempColliders.splice(i, 1);
      }
    }
  };

  Spriteset_Map.prototype.removeAllTempColliders = function() {
    if (!this._tempColliders || this._tempColliders.length === 0) {
      return;
    }
    for (var i = this._tempColliders.length - 1; i >= 0; i--) {
      this._tilemap.removeChild(this._tempColliders[i].sprite);
      this._tempColliders.splice(i, 1);
    }
  };

  var Alias_Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap;
  Spriteset_Map.prototype.updateTilemap = function() {
    Alias_Spriteset_Map_updateTilemap.call(this);
    if (($gameTemp.isPlaytest())) {
      if (this._collisionmap) this.updateTileBoxes();
      if (this._tempColliders) this.updateTempColliders();
    }
  };

  Spriteset_Map.prototype.updateTileBoxes = function() {
    if (this._collisionmap.bitmap !== Movement._collisionmap) {
      this._collisionmap.bitmap = Movement._collisionmap;
    }
    if (this._regionmap.bitmap !== Movement._regionmap) {
      this._regionmap.bitmap = Movement._regionmap;
    }
    this._collisionmap.visible = Movement.showBoxes;
    if (Movement.showBoxes) {
      this._collisionmap.x = -$gameMap.displayX() * $gameMap.tileWidth();
      this._collisionmap.y = -$gameMap.displayY() * $gameMap.tileHeight();
    }
  };

  Spriteset_Map.prototype.updateTempColliders = function() {
    if (this._tempColliders.length > 0) {
      for (var i = this._tempColliders.length - 1; i >= 0; i--) {
        this._tempColliders[i].sprite.visible = Movement.showBoxes;
        if (!this._tempColliders[i].sprite.isPlaying()) {
          this._tilemap.removeChild(this._tempColliders[i].sprite);
          this._tempColliders.splice(i, 1);
        }
      }
    }
  };

  //-----------------------------------------------------------------------------
  /**
  * The basic object that represents an image.
  *
  * @class Bitmap
  */

  var Alias_Bitmap_initialize = Bitmap.prototype.initialize;
  Bitmap.prototype.initialize = function(width, height) {
    Alias_Bitmap_initialize.call(this, width, height);
    this._pixelData = [];
  };

  var Alias_Bitmap_onLoad = Bitmap.prototype._onLoad;
  Bitmap.prototype._onLoad = function() {
    this.addLoadListener(this._setPixelData.bind(this));
    return Alias_Bitmap_onLoad.call(this);
  };

  Bitmap.prototype._setPixelData = function () {
    this._pixelData = this._context.getImageData(0, 0, this.width, this.height).data;
  };

  // Optimized version of getPixel()
  Bitmap.prototype.getColor = function(x, y) {
    if (!this._pixelData) this._setPixelData();
    x = Math.floor(x);
    y = Math.floor(y);
    if (x >= this.width || x < 0 || y >= this.height || y < 0 || this._pixelData.length === 0) {
      return "#000000";
    }
    var i = (x * 4) + (y * 4 * this.width);
    var result = '#';
    for (var c = 0; c < 3; c++) {
      result += this._pixelData[i + c].toString(16).padZero(2);
    }
    return result;
  };

  return Movement;
})();
