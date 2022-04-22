export const calculateOptionOutcomeForMultipleSelection = (userInteractionState, outcomePattern) => {
	const POSITIVE_OUTCOME = 1;
	const NEGATIVE_OUTCOME = 3;
	const NEUTRAL_OUTCOME = 2;

	const isPositiveOutcome = (outcomeValue) => outcomeValue === POSITIVE_OUTCOME;
	const isNegativeOutcome = (outcomeValue) => outcomeValue === NEGATIVE_OUTCOME;

	const allSelectedOptionsOutcomes = userInteractionState.map(selectedOption => Number(selectedOption.outcome));
	// Pattern 1 (if only positive selected) returned outcome should be ==> 1
	const isMatchedFirstOutcomePattern =
		{
			match: allSelectedOptionsOutcomes.every((isPositiveOutcome)),
			outcome: POSITIVE_OUTCOME
		}

	// Pattern 2 (if at least one positive selected) returned outcome should be ==> 1
	const isMatchedSecondOutcomePattern =
		{
			match: allSelectedOptionsOutcomes.some(isPositiveOutcome),
			outcome: POSITIVE_OUTCOME
		};


	// Pattern 3 (if at least one positive selected but not negative) returned outcome should be ==> 1
	const isMatchedThirdOutcomePattern = {
		match: allSelectedOptionsOutcomes.some(isPositiveOutcome)
			&& !allSelectedOptionsOutcomes.some(isNegativeOutcome),
		outcome: POSITIVE_OUTCOME
	}


	// Pattern 4 (if only negative selected) returned outcome should be ==> 3
	const isMatchedFourthOutcomePattern = {
		match: allSelectedOptionsOutcomes.every(isNegativeOutcome),
		outcome: NEGATIVE_OUTCOME
	}

	// Pattern 5 (if at least one negative selected but not positive) returned outcome should be ==> 3
	const isMatchedFifthOutcomePattern = {
		match: allSelectedOptionsOutcomes.some(isNegativeOutcome)
			&& !allSelectedOptionsOutcomes.some(isPositiveOutcome),
		outcome: NEGATIVE_OUTCOME
	}


	const allOutcomePatterns = [
		isMatchedFirstOutcomePattern,
		isMatchedSecondOutcomePattern,
		isMatchedThirdOutcomePattern,
		isMatchedFourthOutcomePattern,
		isMatchedFifthOutcomePattern
	];

	const DEFAULT_PATTERN = "1,4";
	outcomePattern = outcomePattern ? outcomePattern: DEFAULT_PATTERN;
	const patternFromDB = outcomePattern.split(",");

	const possibleOutcomes = patternFromDB.map(outcome => {
		const patternCount = Number(--outcome);
		if(allOutcomePatterns[patternCount].match){
			return allOutcomePatterns[patternCount].outcome;
		}else{
			return NEUTRAL_OUTCOME;
		}
	});

	const outcomeValue =  possibleOutcomes.filter(outcome => {
		return outcome < NEUTRAL_OUTCOME || outcome > NEUTRAL_OUTCOME;
	});
	return String(outcomeValue) || String(NEUTRAL_OUTCOME)
}
