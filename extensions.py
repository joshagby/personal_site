import MySQLdb
import MySQLdb.cursors
import config
import hashlib
import uuid

def connect_to_database():
	options = {
		'host': config.env['host'],
		'user': config.env['user'],
		'passwd': config.env['password'],
		'db': config.env['db'],
		'cursorclass' : MySQLdb.cursors.DictCursor
	}
	db = MySQLdb.connect(**options)
	db.autocommit(True)
	return db

# password encryption algorithm - not used atm
# def encrypt_password(password, salt = uuid.uuid4().hex):
#    alg = "sha512"
#
#    m = hashlib.new(alg)
#    m.update(salt + password)
#    password_hash = m.hexdigest()
#
#    encrypted = "$".join([alg, salt, password_hash])
#
#    return encrypted
