from flask import *
import extensions
from random import *

api_dice_roll = Blueprint('api_dice_roll', __name__)

@api_dice_roll.route('/api/v1/dice_roll/<numDice>', methods=['GET'])
def dice_roll_api(numDice):
	# creates a list of rolls, each of which is a dice roll (1-6)
	# input numDice must be an integer greater than or equal to 1.
	# If it does not meet these criteria, it will set numDice to 1.

	try:
		numRolls = int(numDice)
	except:
		numRolls = 1

	if numRolls < 1:
		numRolls = 1

	rolls = []

	# 'roll' a die numRolls times
	for x in range(numRolls):
		rolls.append(randrange(1,7))

	return jsonify(rolls=rolls)