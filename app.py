from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrap_mars_data
from sqlalchemy import create_engine
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
import csv
import requests
from scipy import stats

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
    country = engine.execute("select * from country ", con=engine)
    data_cat = engine.execute("select * from satellite_category", con=engine)
    #return render_template("index.html", listings=listings)
    # Return template and data
    testValTestOnly = {'firstname': 'Harry', 'lastname': 'Potter'}
    resdata = {
        "lat":"test1",
        "lng":"test2"
    }
    return render_template("index.html", country=country, category=data_cat, testVal = testValTestOnly,resdata=resdata)


#
#@app.route("/api/v1.0/<startdt>/<enddt>")
#def startEndDate(startdt, enddt):

# Route to render index.html template using data from Mongo
@app.route("/getSatellite/<cntry>")
def satellite_country(cntry):

    # Find one record of data from the mongo database
    # @TODO: YOUR CODE HERE!
    sat_cnt_cnt = engine.execute("select * from country_satellite where country_code='"+cntry+"'", con=engine)
    data_cat = engine.execute("select * from satellite_category", con=engine)
    
    country = engine.execute("select * from country ", con=engine)
    #return render_template("index.html", listings=listings)
    # Return template and data

    incrd =0
    coordinatesjson = {}
    resdata = [{
  
    }
    ]

    responsedata = { 'respdata': resdata
    }

    incdata = 0
    
    for record in sat_cnt_cnt:
        coordinatesjson = {}
        try: 
            url = "https://api.n2yo.com/rest/v1/satellite/positions/"+str(record['satellite_id'])+"/41.702/-76.014/0/2/&apiKey=J3H9EJ-Z2GE6Y-BC2E6G-4LOF"
            response = requests.get(url).json()            
            #print(response)
            print(response['positions'][0]['satlatitude'])
            print(response['positions'][0]['satlongitude'])
            print(response['positions'])
            print(response['info']['satname'])
            print(response['info']['satid'])
            print(response['positions'][0]['azimuth'] )
            print(response['positions'][0]['elevation'] )
            print(response['positions'][0]['sataltitude']   )
            #print(response['info'])
          #  coordinates.append(response['positions'][0]['satlatitude'])
          #  coordinates.append(response['positions'][0]['satlongitude'])
            coordinatesjson['latitude'] = response['positions'][0]['satlatitude']            
            coordinatesjson['longitude'] = response['positions'][0]['satlongitude']                      
            #coordinatesjson['azimuth'] = response['positions'][0]['azimuth']            
            #coordinatesjson['elevation'] = response['positions'][0]['elevation']            
            #coordinatesjson['altitude'] = response['positions'][0]['sataltitude']            
            #coordinatesjson['satname'] = response['info']['satname']            
            #coordinatesjson['satid'] = response['info']['satid']  
            resdata.append(coordinatesjson)
            incrd = incrd+1
            incdata = incdata+1
            if (incrd >10):
                break
        except:
            pass

        responsedata['respdata'] = resdata
    
    testValTestOnly = {'firstname': 'Harry', 'lastname': 'Potter'}

    # Build partial query URL
   
    return render_template("index2.html", country=country, category=data_cat, sat_country=sat_cnt_cnt,resdata=responsedata,testVal = testValTestOnly)



if __name__ == "__main__":
    app.run(debug=True)
