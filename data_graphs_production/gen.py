from numpy import random as npr
from datetime import datetime, timedelta
from json import loads
from pprint import pprint


def genTime(start:datetime, end:datetime, delta:timedelta):
    curr = start
    while curr < end:
        yield curr
        curr += delta


def updateTrend(price: float, reduction: int, length: int, cut_off: float):
    trend_abs = npr.uniform(-1, 1, length)
    old_price = (price - (reduction / 2)*0.3)
    for x in trend_abs:
        if npr.random() > cut_off:
            new_price = x * reduction / 2 + (price - (reduction / 2))
            old_price = new_price
        yield old_price


if __name__ == "__main__":
    #  get the info from the product to generate a good time series
    d = open("../database_production/product_db.json", mode="r")
    evaluation = d.readlines()
    products = loads(evaluation[0])["products"]

    d.close()
    series = []

    for result in genTime(datetime(2017, 1, 1, 0), datetime(2017, 12, 1, 23), timedelta(hours=6)):
        series.append(result.__str__())

    # pprint(series)

    header = "date,value\n"
    for product in products.values():
        pprint(product)

        d = open("./data_products/data_" + str(product["id"]) + ".csv", mode="w")
        d.write(header)

        price = int(product["price"])
        reduction = int(product["reduction"])

        trend = [x for x in updateTrend(price, reduction, len(series), 0.9)]

        for date, value in zip(series, trend):
            entry = date + "," + str(round(value, 0)) + "\n"
            d.write(entry)
            print(entry)

        d.close()
