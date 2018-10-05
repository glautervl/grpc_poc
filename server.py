
from concurrent import futures
import time

import grpc

import basicmessage_pb2
import basicmessage_pb2_grpc

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class BasicService(basicmessage_pb2_grpc.BasicServiceServicer):

    def ShowMessage(self, request, context):
        return basicmessage_pb2.OutputMessage(message='I am the python server, who are you ? , %s!' % request.name)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    basicmessage_pb2_grpc.add_BasicServiceServicer_to_server(BasicService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()
