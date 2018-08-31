"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input":['GYVABW', 'AOCGYV', 'CABVGO', 'OVYWGA'],
            "answer": 3
        },
        {
            "input":['GYVABW', 'AOCGYW', 'CAYVGO', 'OVYWGA'],
            "answer": 2
        }
    ],
    "Extra": [
        {
            "input":['GYVABW', 'ABCGYW', 'CAYRGO', 'OCYWBA', 'ACYVBR'],
            "answer": 1
        },
        {
            "input":['GYCABW', 'ARCGYW', 'RGBCAW', 'RGBCAY', 'OCYWBA', 'WCAVBR', 'ACYVWR', 'OCYWBA', 'WCAVBR', 'ACYVWR'],
            "answer": 2
        },
        {
            "input":['GYCABW', 'GYCABW', 'GYCABW', 'GYCABW', 'GYCABW'],
            "answer": 5
        }
    ]
}
