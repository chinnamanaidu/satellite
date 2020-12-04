from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrap_mars_data
from sqlalchemy import create_engine
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/web_scrapping_challenge_db")

rds_connection_string = "postgres:admin@localhost:5432/satellite"
#<insert password>@localhost:5432/customer_db"
engine = create_engine(f'postgresql://{rds_connection_string}')


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    # @TODO: YOUR CODE HERE!
    data_cnt = engine.execute("select * from country ", con=engine)
    data_cat = engine.execute("select * from satellite_category", con=engine)
    #return render_template("index.html", listings=listings)
    # Return template and data
    return render_template("index.html", country=data_cnt, category=data_cat)


# Route to render index.html template using data from Mongo
@app.route("/getSatellite?cnt=US")
def satellite_country():

    # Find one record of data from the mongo database
    # @TODO: YOUR CODE HERE!
    sat_cnt_cnt = engine.execute("select * from country_satellite where country_code=\'US\'", con=engine)
    data_cat = engine.execute("select * from satellite_category", con=engine)
    #return render_template("index.html", listings=listings)
    # Return template and data
    return render_template("index.html", country=sat_cnt_cnt, category=data_cat)



if __name__ == "__main__":
    app.run(debug=True)
