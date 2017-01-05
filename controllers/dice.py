from flask import *
import extensions

dice = Blueprint('dice', __name__, template_folder='templates')

@dice.route('/dice')
def dice_route():
    options = {}

    return render_template("dice.html", **options)
