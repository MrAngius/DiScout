import json
import pprint


if __name__ == "__main__":
    l = {}

    f = open("database_products.csv")
    header = f.readline().split(";")
    #print(header)


    for id, row in enumerate(f.readlines()):
        tmp = row.split(";")
        product = {}
        product["id"] = id
        for column, value in zip(header, tmp):
            product[column] = value
        l[id] = product

    f.close()
    #pprint.pprint(l)

    def_db = {'products': l}

    with open("product_db.json", mode="w") as db:
        db_str = json.dumps(def_db)
        db.write(db_str)

    db.close()

    d = open("product_db.json", mode="r")
    evaluation = d.readlines()

    pprint.pprint(json.loads(evaluation[0]))

    d.close()
