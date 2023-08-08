const latinLettersOrDigits = /^[\s\w\~\`\!\@\#\$\%\^\&\*\\\/\(\)\_\-\+\=\"\;\:\'\?\.\,]*[A-Za-z\d]+[\s\w\~\`\!\@\#\$\%\^\&\*\\\/\(\)\_\-\+\=\"\;\:\'\?\.\,]*$/;
const latinLettersAndDigits = /^[\d\s\w\~\`\!\@\#\$\%\^\&\*\\\/\(\)\_\-\+\=\"\;\:\'\?\.\,]*[A-Za-z]+[\d\s\w\~\`\!\@\#\$\%\^\&\*\\\/\(\)\_\-\+\=\"\;\:\'\?\.\,]*$/;
const onlyLatinLetters = /^[\sA-Za-z\~\`\!\@\#\$\%\^\&\*\\\/\(\)\_\-\+\=\"\;\:\'\?\.\,]*[A-Za-z]+[\sA-Za-z\~\`\!\@\#\$\%\^\&\*\\\/\(\)\_\-\+\=\"\;\:\'\?\.\,]*$/;


export {
    latinLettersOrDigits,
    latinLettersAndDigits,
    onlyLatinLetters,
}