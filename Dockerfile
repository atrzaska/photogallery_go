# IMAGE: andrzejtrzaska/photogallery
FROM golang:1.16-alpine AS builder
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
RUN go build

FROM alpine:latest  
WORKDIR /app
COPY --from=builder /app/photogallery ./
COPY public /app/public
ENV PORT=80
ENV GALLERY_PATH=/gallery
CMD ["./photogallery"]  
EXPOSE 80
