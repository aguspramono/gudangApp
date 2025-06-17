export const giveZero = (iNum:number, iHowMuchZero:number) => {
    let text="";
    let text2="";
    text = iNum.toString().trim();
	text2 = "";
    let i=0;
	for (i = 0; i < iHowMuchZero - text.length; i++)
	{
		text2 += "0";
	}
	return text2 + iNum.toString().trim();
};