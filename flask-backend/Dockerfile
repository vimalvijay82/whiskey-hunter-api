FROM python:3.10-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN pip3 install --upgrade pip && pip3 install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD ["python3","server.py"]

