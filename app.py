from flask import Flask, render_template, session
import controllers
import extensions
import config
import api

# set url_prefix
prefix = ""

# Initialize Flask app with the template folder address
app = Flask(__name__, template_folder='templates')

# secret key - change / set if sessions are implemented
# app.secret_key = 'N5\\A\xa7!\x80\xa0j\xd1\xdf\x19\xc8n\n\x1e)(\xb1Z\x7f?\x07A'

# Register the controllers
app.register_blueprint(controllers.main, url_prefix=prefix)
app.register_blueprint(controllers.dice, url_prefix=prefix)
app.register_blueprint(api.api_dice_roll, url_prefix=prefix)

# Listen on external IPs
# Set host and port information in config.py file
if __name__ == '__main__':
    # listen on external IPs
    app.run(host=config.env['host'], port=config.env['port'], debug=True)