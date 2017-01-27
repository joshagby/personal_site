from flask import *

resume = Blueprint('resume', __name__, template_folder='templates')

@resume.route('/resume')
def resume_route():
    options = {}

    return render_template("resume.html", **options)
