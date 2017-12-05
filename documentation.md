#end ponts
_get_("/api/getDate/:id", dateCtrl.getDate)
gets date by ID that is passed through returns 
```
[
    {
        "id": 1,
        "date_id": "319820389021",
        "title": "test",
        "first_buisness": "test",
        "second_buisness": null,
        "third_buisness": null
    }
]
```
_post_("/api/addDate", dateCtrl.addDate)
adds a date and is expecting:
 a random 1-12 digit id, title, and a buisness with two optional buisnesses


_put_(/api/modifyDate/:id) 
edits date by id and is expecting: the date id that comes on req.params.id, and a buisness with an optional two buisnesses


_get_(/api/getAllDates)
gets all dates returns an array that looks like 
```
[
    {
        "id": 2,
        "date_id": "20",
        "title": "test",
        "first_buisness": "double",
        "second_buisness": "yeah",
        "third_buisness": null
    },
    {
        "id": 3,
        "date_id": "20",
        "title": "test",
        "first_buisness": "double",
        "second_buisness": "yeah",
        "third_buisness": null
    },
    {
        "id": 4,
        "date_id": "20",
        "title": "test",
        "first_buisness": "double",
        "second_buisness": "yeah",
        "third_buisness": null
    },
    {
        "id": 5,
        "date_id": "20",
        "title": "test",
        "first_buisness": "double",
        "second_buisness": "yeah",
        "third_buisness": null
    },
    {
        "id": 1,
        "date_id": "319820389021",
        "title": "test",
        "first_buisness": "test",
        "second_buisness": null,
        "third_buisness": null
    }
]
```
