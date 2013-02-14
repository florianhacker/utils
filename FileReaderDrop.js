window.FileReaderDrop = (function(){


  function FileReaderDrop( options ){

    this.settings = $.extend( {
      'id' : 'default',
      'el' : '.drop-box',
      'imgSelector' : 'img',
      'autoUpdate' : 'true'
    }, options);

    this.$el = $( this.settings.el );

    this.init();
  }


  FileReaderDrop.prototype.init = function() {
    this.addEventListeners();
  }


  FileReaderDrop.prototype.addEventListeners = function() {
    
    this.$el.on("dragstart", $.proxy(this.onDragstart, this) );
    this.$el.on("drag", $.proxy(this.onDrag, this) );
    this.$el.on("dragenter", $.proxy(this.onDragenter, this) );
    this.$el.on("dragleave", $.proxy(this.onDragleave, this) );
    this.$el.on("dragover", $.proxy(this.onDragover, this) );
    this.$el.on("drop", $.proxy(this.onDrop, this) );
    this.$el.on("dragend", $.proxy(this.onDragend, this) );
  }


  FileReaderDrop.prototype.onDragstart = function(e){
    
    // console.log("ondragstart")

    e.stopPropagation();
    e.preventDefault();
  }

  FileReaderDrop.prototype.onDrag = function(e){
    
    // console.log("drag")
    
    e.stopPropagation();
    e.preventDefault();
  }


  FileReaderDrop.prototype.onDragenter = function(e){
    
    // console.log("dragenter")
    
    e.stopPropagation();
    e.preventDefault();

    this.$el.addClass('drag-enter');
  }


  FileReaderDrop.prototype.onDragleave = function(e){
    
    // console.log("dragleave")
   
    e.stopPropagation();
    e.preventDefault();

    this.$el.addClass('drag-leave');
    this.$el.removeClass('drag-over');
  }


  FileReaderDrop.prototype.onDragover = function(e){
    
    // console.log("dragover")
   
    e.stopPropagation();
    e.preventDefault();

    this.$el.addClass('drag-over');
  }


  FileReaderDrop.prototype.onDrop = function(e){
    
    // console.log("onDrop")
  
    e.stopPropagation();
    e.preventDefault();

    this.$el.addClass('drop');

    this.readFiles( e.originalEvent.dataTransfer.files );

    this.reset();
  }


  FileReaderDrop.prototype.dragend = function(e){
    
    // console.log("dragend")
  
    e.stopPropagation();
    e.preventDefault();

    this.$el.addClass('dragend');

  }


  FileReaderDrop.prototype.readFiles = function( files ){

    var count = files.length;
     
    // Only call the handler if 1 or more files was dropped.
    if (count > 0){
      this.handleFiles(files);
    }
  }


  FileReaderDrop.prototype.handleFiles = function(files){

    var file = files[0];
    var reader = new FileReader();

    reader.onload = $.proxy( this.handleReaderLoad, this);

    reader.readAsDataURL(file);
  }


  FileReaderDrop.prototype.handleReaderLoad = function(evt) {
    
    this.src = evt.target.result;
    
    this.$el.trigger("file-dropped", { id : this.settings.id, file : this.src } );
    
    if(this.settings.autoUpdate){
      this.$el.find(this.settings.imgSelector).attr('src', this.src).css('visibility', 'visible');      
    }
  }

  FileReaderDrop.prototype.reset = function(evt) {
  
    this.$el.removeClass("drag-start");
    this.$el.removeClass("drag");
    this.$el.removeClass("drag-enter");
    this.$el.removeClass("drag-leave");
    this.$el.removeClass("drag-over");
    this.$el.removeClass("drop");
    this.$el.removeClass("dragend");
  }
  

  FileReaderDrop.prototype.getSource = function(){
    return this.src;
  }

  return FileReaderDrop;

})();