class MathUtilities
{
	static toInteger(str)
	{
		if (str == "")
			return 0;
		if (!isNaN(str))
			return Math.abs(parseInt(str));
		return 0;
	}

	static toFloat(str)
	{
		if (str == "")
			return 0;
		if (!isNaN(str))
			return Math.abs(parseFloat(str).toFixed(2));
		return 0;
	}

	static fromInteger(int)
	{
		if (int == 0)
			return "";
	return MathUtilities.toInteger(Math.abs(int));
	}

	static fromFloat(flo)
	{
		if (flo == 0)
			return "";
		return MathUtilities.toFloat(Math.abs(flo));
	}
}


