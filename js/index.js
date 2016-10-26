$(document).ready(function () { 
  var guess1 = new guess(1, 10, 'guess1', 'guess1_text', 'guess1_check', 'guess1_again', 'alert1'); 
}); 

// 
// keyCodes is an object that defines keycodes for the key handlers 
// 
function keyCodes () { 
  // Define values for keycodes 
  this.tab        = 9; 
  this.enter      = 13; 
  this.esc        = 27; 
  this.space      = 32; 
} 

// 
// alertDlg() is a class to implement a modal alert dialog 
// 
// @param (alert_id string) alert_id is the id of the dialog to create 
// 
// @param (game_id string) game_id is the id to attach the dialog to 
// @return N/A 
// 
function alertDlg(alert_id, game_id) { 
  var dlg = '<div id="' + alert_id + '" role="alertdialog" tabindex="-1" aria-hidden="true" aria-labelledby="' + 
    alert_id + '_title" aria-describedby="' + alert_id + '_message"><p id="' + alert_id + '_title" class="title">Alert Box</p><p id="' + 
    alert_id + '_message">No Message</p><input id="' + 
    alert_id + '_close" type="button" value="Close" /></div>'; 

  // append the dialog to the document 
  $('div#' + game_id).append(dlg); 

  // Define the object properties 
  this.$dlg  = $('#' + alert_id); // the object pointer of the dialog 
  this.$game = $('#' + game_id); // the object pointer of the containing div for the game 
  this.$msg = $('#' + alert_id + '_message'); // the object pointer of the alert message area 
  this.$button = $('#' + alert_id + '_close'); // the object pointer of the alert close button 
  this.$focus; // the object pointer of a page element to give focus to on dialog dismissal 

  this.keys = new keyCodes(); 

  // bind handlers 
  this.bindHandlers(); 

} // end alertDlg constructor 

// 
// showMsg() is a member function to set the message text of the alertDlg 
// 
// @param (msg string) msg is the message to display in the dialog box. 
// 
// @param (focusId string) focusId is the id of the element to give focus to when the dialog is dismissed. 
// 
// @return N/A 
// 
alertDlg.prototype.showMsg = function (msg, $focus) { 

  // Store the focus ID 
  this.$focus = $focus; 

  // Set the message text 
  this.$msg.html(msg); 

  // Show the dialog 
  this.showDlg(); 

} // end showMsg() 

// 
// bindHandlers() is a member function to bind event handlers to the modal alert dialog 
// 
// @return N/A 
// 
alertDlg.prototype.bindHandlers = function () { 

  var thisObj = this; // store the this pointer 

  // bind a keydown handler 
  this.$dlg.keydown(function(e) { 
    return thisObj.handleDlgKeyDown(e); 
  }); 

  // bind a keypress handler 
  this.$dlg.keypress(function(e) { 
    return thisObj.handleDlgKeyPress(e); 
  }); 

  // bind a click handler 
  this.$button.click(function(e) { 
    return thisObj.handleCloseClick(e); 
  }); 

} // end bindhandlers() 

// 
// handleDlgKeyDown() is a member function to process keydown events for the alert dialog 
// 
// @param (evt obj) evt is the event object associated with the keydown event 
// 
// @return (boolean) true if propagating; false if consuming event 
// 
alertDlg.prototype.handleDlgKeyDown = function(evt) { 

  if (evt.ctrlKey || evt.AltKey) { 
    // do nothing 
    return true; 
  } 

  switch (evt.keyCode) { 
    case this.keys.tab: { 
      // Consume the tab event and do nothing 
      evt.stopPropagation; 
      return false; 
    } 
    case this.keys.enter: 
    case this.keys.esc: 
    case this.keys.space: { 

      // hide the dialog 
      this.hideDlg(); 

      evt.stopPropagation; 
      return false; 

      break; 
    } 
  } // end switch 

  return true; 

} // end handleDlgKeyDown() 

// 
// handleDlgKeyPress() is a member function to consume keypress events for the alert dialog 
// 
// @param (evt obj) evt is the event object associated with the keydown event 
// 
// @return (boolean) true if propagating; false if consuming event 
// 
alertDlg.prototype.handleDlgKeyPress = function(evt) { 

  if (evt.ctrlKey || evt.AltKey) { 
    // do nothing 
    return true; 
  } 

  switch (evt.keyCode) { 
    case this.keys.tab: 
    case this.keys.enter: 
    case this.keys.esc: 
    case this.keys.space: { 

      evt.stopPropagation; 
      return false; 

      break; 
    } 
  } // end switch 

  return true; 

} // end handleDlgKeyPress() 

// 
// handleCloseClick() is a member function to process click events for the alert dialog close button 
// 
// @param (evt obj) evt is the event object associated with the click event 
// 
// @return (boolean) true if propagating; false if consuming event 
// 
alertDlg.prototype.handleCloseClick = function(evt) { 

  if (evt.shiftKey || evt.ctrlKey || evt.AltKey) { 
    // do nothing 
    return true; 
  } 

  // Hide the dialog 
  this.hideDlg(); 

  evt.stopPropagation; 
  return false; 

} // end handleCloseClick() 

// 
// showDlg() is a member function to show the alert dialog and give it focus 
// 
// @return N/A 
// 
alertDlg.prototype.showDlg = function() { 

  var thisObj = this; 

  // Bind an event listener to the document to capture all mouse events to make dialog modal 
  $(document).bind('click mousedown mouseup mousemove mouseover', function(e) { 

    //ensure focus remains on the dialog 
    thisObj.$dlg.focus(); 

    // Consume all mouse events and do nothing 
    e.stopPropagation; 
    return false; 
  }); 

  // Position the dialog centered in the containing div 
  this.$dlg.css('left', (this.$game.width() - this.$dlg.width()) / 2 + this.$game.offset().left + 'px'); 
  this.$dlg.css('top', (this.$game.height() - this.$dlg.height()) / 2 + this.$game.offset().top + 'px'); 

  // Display the dialog 
  this.$dlg.show(); 
  this.$dlg.attr('aria-hidden', 'false'); 

  // Give the dialog focus 
  this.$dlg.attr('tabindex', '0'); 

        // give focus to close button 
  this.$button.focus(); 

} // end showDlg() 

// 
// hideDlg() is a member function to hide the alert dialog and return focus to the page 
// 
// @return N/A 
// 
alertDlg.prototype.hideDlg = function() { 

  // set aria hidden attribute and remove dialog from tab order 
  this.$dlg.attr('aria-hidden', 'true'); 
  this.$dlg.attr('tabindex', '-1'); 

  // hide the dialog 
  this.$dlg.hide(); 

  // Unbind the document mouse event listeners 
  $(document).unbind('click mousedown mouseup mousemove'); 

  // return focus to the specified page element 
  if (this.$focus) { 
    this.$focus.focus(); 
  } 

} // end hideDlg() 


/////////////////////////////////////////////////////////////////////////////////////////// 
// 
// guess() is a class to implement a simple number guessing game 
// 
// @param (game_id) game_id is the id to attach the instance of the game to. 
// 
// @param (max integer) min is the maximum number to guess. 
// 
// @param (text_id string) text_id is the id of the text box where player enters a guess. 
// 
// @param (check_id string) check_id is the id of the check guess button. 
// 
// @param (again_id string) again_id is the id of the play again button. 
// 
// @param (alertObj) alertObj is the modal dialog object where game messages will be printed. 
// 
// @return N/A 
// 
function guess(min, max, game_id, text_id, check_id, again_id, alert_id) { 
   
  // define class properties 
  this.minGuess = min;         // the minimum number to guess 
  this.maxGuess = max;         // the maximum number to guess 
  this.$text = $('#' + text_id);   // the jQuery object pointer to the text box 
  this.$check = $('#' + check_id); // the jQuery object pointer to the check guess button 
  this.$again = $('#' + again_id); // the jQuery object pointer to the play again button 
  this.alertDlg = new alertDlg('alert1', game_id); // the modal alert dialog to be displayed during the game 

  this.guessVal = -1;        // the number for the player to guess 
  this.guessCount = 0;       // the number of attempts the player has made 

  this.keys = new keyCodes(); 

  // bind event handlers 
  this.bindHandlers(); 

  // initialize the game 
  this.newGame(); 

} // end guess object constructor 

// 
// newGame() is a member function to set up a new game. The function chooses a number 
// between 1 and the max number specified at instantiation, sets the guess count to 0, and 
// show the user a message to make a guess. 
// 
// @return N/A 
guess.prototype.newGame = function () { 

  // get a new random number for the player to guess 
  this.guessVal = Math.floor(Math.random()*(this.maxGuess - this.minGuess + 1)) + this.minGuess; 
   
  // reset the guess count 
  this.guessCount = 0; 

  // reset the guess text box 
  this.$text.val(''); 
  this.$text.attr('aria-invalid', 'false'); 

  // Re-enable the buttons 
  this.$text.removeAttr('disabled'); 
  this.$check.removeAttr('disabled'); 

  // Set focus on the guess text box 
  this.$text.focus(); 

} // end newGame 

// 
// bindHandlers() is a function to bind the event handlers for the game controls 
// 
// @return N/A 
// 
guess.prototype.bindHandlers = function () { 

  var thisObj = this; // Store the this pointer 

  // bind a focus handler for the guess text box 
  this.$text.focus(function (e) { 
    thisObj.handleTextFocus(e); 
    return true; 
  }); 

  // bind a keydown handler for the guess text box 
  this.$text.keydown(function (e) { 
    return thisObj.handleTextKeyDown(e); 
  }); 

  // bind a keypress handler for the guess text box 
  this.$text.keypress(function (e) { 
    return thisObj.handleTextKeyPress(e); 
  }); 

  // bind a click handler for the check guess button 
  this.$check.click(function (e) { 
    return thisObj.handleCheckClick(e); 
  }); 

  // bind a click handler for the play again button 
  this.$again.click(function (e) { 
    return thisObj.handleAgainClick(e); 
  }); 

} // end bindHandlers() 

// 
// handleTextFocus() is a member function to process focus events for the guess text box 
// 
// @input (evt obj) evt is the event object associated with the keydown event 
// 
// @return N/A 
// 
guess.prototype.handleTextFocus = function(evt) { 

  // Select any text in the text box 
  this.$text.select(); 

} // end handleTextFocus() 

// 
// handleTextKeyDown() is a member function to process keydown events for the guess text box 
// 
// @input (evt obj) evt is the event object associated with the keydown event 
// 
// @return (boolean) false if consuming event, true if propagating 
// 
guess.prototype.handleTextKeyDown = function(evt) { 

  // do nothing if shift, alt, or ctrl key pressed. 
  if (evt.shiftKey || evt.altKey || evt.ctrlKey) { 
    return true; 
  } 

  if (evt.keyCode == this.keys.enter) { 

    // validate the guess 
    if (this.validateGuess() == true) { 

      // increment the guess count 
      this.guessCount++; 

      // see if the player has won 
      if (this.checkGuess() == true) { 
        // disable the guess text box and the check guess button 
        this.$text.attr('disabled', 'true'); 
        this.$check.attr('disabled', 'true'); 
      } 
    } 

    evt.stopPropagation; 
    return false; 
  } 

  return true; 

} // end handleTextKeyDown() 

// 
// handleTextKeyPress() is a member function to process keypress events for the guess text box. This function 
// is included to handle browsers that perform window scrolling, etc. on keypress rather than keydown. 
// 
// @input (evt obj) evt is the event object associated with the keypress event 
// 
// @return (boolean) false if consuming event, true if propagating 
// 
guess.prototype.handleTextKeyPress = function(evt) { 

  // do nothing if shift, alt, or ctrl key pressed. 
  if (evt.shiftKey || evt.altKey || evt.ctrlKey) { 
    return true; 
  } 

  if (evt.keyCode == this.enterKey) { 

    // consume the event 
    evt.stopPropagation; 
    return false; 
  } 

  return true; 

} // end handleTextKeyPress() 

// 
// handleCheckClick() is a member function to process click events for the check guess button 
// 
// @input (evt obj) evt is the event object associated with the click event 
// 
// @return (boolean) false if consuming event, true if propagating 
// 
guess.prototype.handleCheckClick = function(evt) { 

  // do nothing if shift, alt, or ctrl key pressed. 
  if (evt.shiftKey || evt.altKey || evt.ctrlKey) { 
    return true; 
  } 

  // validate the guess 
  if (this.validateGuess() == true) { 

    // increment the guess count 
    this.guessCount++; 

    // see if the player has won 
    if (this.checkGuess() == true) { 
      // disable the guess text box and the check guess button 
      this.$text.attr('disabled', 'true'); 
      this.$check.attr('disabled', 'true'); 
    } 
  } 
     
  evt.stopPropagation; 
  return false; 

} // end handleCheckClick() 

// 
// handleAgainClick() is a member function to process click events for the play again button 
// 
// @input (evt obj) evt is the event object associated with the click event 
// 
// @return (boolean) false if consuming event, true if propagating 
// 
guess.prototype.handleAgainClick = function(evt) { 

  // do nothing if shift, alt, or ctrl key pressed. 
  if (evt.shiftKey || evt.altKey || evt.ctrlKey) { 
    return true; 
  } 

  // Setup a new game 
  this.newGame(); 

  evt.stopPropagation; 
  return false; 

} // end handleTextKeyDown() 

// 
// validateGuess() is a member function to validate a player's guess. If the guess is not a number, is less than 
// the minimum allowed guess, or is greater than the maximum allowed guess, the user is warned that the guess is invalid 
// 
// @return (boolean) true if guess is valid; false if guess is invalid 
// 
guess.prototype.validateGuess = function() { 
  var val = this.$text.val(); 

  if (this.$text.val() == '') { 
    // guess is empty 
    this.$text.attr('aria-invalid', 'true'); 
    this.alertDlg.showMsg('Vous devez absolument entrer un nombre', this.$text); 

    return false; 
  } 
  else if (isNaN(val) == true) { 

    // guess is not a number 
    this.$text.attr('aria-invalid', 'true'); 
    this.alertDlg.showMsg('\'' + this.$text.val() + '\' votre nombre?', this.$text); 

    return false; 
  } 
  else if (val < this.minGuess || val > this.maxGuess) { 

    // guess is out of range 
    this.$text.attr('aria-invalid', 'true'); 
    this.alertDlg.showMsg('Vous devez choisir un nombre ' + this.minGuess + ' et ' + this.maxGuess + '!', this.$text); 

    return false; 
  } 
   
  this.$text.attr('aria-invalid', 'false'); 

  return true; 

} // end validateGuess() 

// 
// checkGuess() is a member function to check the player's guess to see if he or she has won the game 
// 
// @return (boolean) true if the player has won; false if not 
guess.prototype.checkGuess = function() { 

  var guess = this.$text.val(); 

  if (guess == this.guessVal) { 

    // The player has won. Tell the player how many tries it took 

    if (this.guessCount == 1) { 
      this.alertDlg.showMsg('\'' + guess + '\' is right. You got it on your first try!', this.$again); 
    } 
    else { 
      this.alertDlg.showMsg('\'' + guess + '\' is right. It only took you ' + this.guessCount + ' tries!', this.$again); 
    } 
    return true; 
  } 

  // Player did not guess the correct number. Tell the player if he or she is too high or too low 
  if (guess < this.guessVal) { 
    this.alertDlg.showMsg('\'' + guess + '\' '+' trop bas. Essayez un nombre plus gros.', this.$text); 
  } 
  else { 
      this.alertDlg.showMsg('\'' + guess + '\'trop haut. Essayez un nombre plus petit.', this.$text); 
  } 

  return false; 

} // end checkGuess()