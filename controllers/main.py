from flask import *
import extensions

main = Blueprint('main', __name__, template_folder='templates')

@main.route('/')
def main_route():
    options = {}

    return render_template("index.html", **options)

