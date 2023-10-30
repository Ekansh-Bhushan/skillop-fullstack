import pandas as pd
import json
# read the collage_list.py file containg collage name , state , city and make a json file state with cities with colleges
# [
#     state1: {
#         city1:[collage1,collage2,collage3],
#         city2:[collage1,collage2,collage3],
#     }
#     state2: {
#         city1:[collage1,collage2,collage3],
#         city2:[collage1,collage2,collage3],
#     }
# ]

# we will make this object and save to json


def organize_data(file_name):
    df = pd.read_csv(file_name)
    states = df["State"].unique()
    data = {}
    for state in states:
        data[state.lower()] = {}
        cities = df[df["State"] == state]["City"].unique()
        for city in cities:
            data[state.lower()][city.lower()] = list(
                df[(df["State"] == state) & (df["City"] == city)]["Name"]
            )
    return data


if __name__ == "__main__":
    with open("college_list.json", "w") as f:
        x = organize_data("college_list.csv")
        json.dump(x, f)