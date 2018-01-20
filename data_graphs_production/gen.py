from numpy import random as npr
from datetime import datetime, timedelta
from json import loads
from pprint import pprint


def genTime(start, end, delta):
    curr = start
    while curr < end:
        yield curr
        curr += delta


if __name__ == "__main__":
    # get the info from the product to generate a good time series
    d = open("../database_production/product_db.json", mode="r")
    evaluation = d.readlines()
    products = loads(evaluation[0])["products"]

    d.close()
    series = []

    for result in genTime(datetime(2017, 1, 1, 0), datetime(2017, 12, 1, 23), timedelta(hours=6)):
        series.append(result.__str__())

    #pprint(series)

    header = "date,value\n"
    for product in products.values():
        pprint(product)

        # gen the random values
        data = npr.normal(int(product["price"]), int(product["reduction"]), len(series))

        d = open("./data_products/data_" + str(product["id"]) + ".csv", mode="w")
        d.write(header)
        for date, value in zip(series, data):
            entry = date + "," + str(round(value, 0)) + "\n"
            d.write(entry)
            print(entry)

        d.close()
