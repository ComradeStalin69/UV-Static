    var out = document.getElementById("output");
    window.addEventListener('load', getWord)


    btn.addEventListener("click", getWord);
   
    function getWord(){
     
      
      var theWord= [
        'Fun!',
        'took too long to code this',
        'Insert vomit noises here',
        'angry node.js sounds here',
        'bluergh',
        'css sucks',
         'goguardian can shove it up their sudo rm -rf',
         'x=x+1!',
        'my eyes have been vegetablized',
        'good god',
        'tripping',
        '8gb of ram isnt enough',
        'Muy Bien!',
        'ip tracking go brrrrrrrrrrrrrr',
        'insert all of r/showerthoughts here',
        'me opening the 5mb zip file',
      ];


      var wordNum = Math.floor(Math.random() * theWord.length);
      
     
      output.textContent = theWord[wordNum];
    }
