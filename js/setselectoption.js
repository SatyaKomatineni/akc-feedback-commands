function setSelectOption(theSelect, theValue)
 {
   for (var i = 0; i < theSelect.length; i++)
    {
       if (theSelect.options[i].value == theValue)
        {
          theSelect.selectedIndex = i;
          return;
        }
    }
   theSelect.selectedIndex = 0;
   return;
 }
