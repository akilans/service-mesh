import requests
import os
import time

book_service_url = os.getenv("BOOK_SERVICE", "http://localhost:5000")
review_service_url = os.getenv("REVIEW_SERVICE", "http://localhost:7000")
web_service_url = os.getenv("WEB_SERVICE", "http://localhost:3000")

book_ids = ["1", "2", "3"]

while True:

    try:
        books_response = requests.get(book_service_url)
        print("Requesting "+book_service_url)
        print(books_response)

        # Introducing errors
        web_response = requests.get(web_service_url+"/error")
        print("Requesting "+web_service_url+"/error")
        print(web_response)

        # Introducing errors
        review_response = requests.get(review_service_url+"/error")
        print("Requesting "+review_service_url+"/error")
        print(review_response)

        for id in book_ids:
            review_response = requests.get(review_service_url+"/review/"+id)
            print("Requesting "+review_service_url+"/review/"+id)
            print(review_response)
        print("Taking rest for 30 seconds....")
        time.sleep(30)
    except Exception as error:
        print(error)
