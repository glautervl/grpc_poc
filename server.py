
from concurrent import futures
import time

import grpc

import sentiment_analysis_rpc_pb2
import sentiment_analysis_rpc_pb2_grpc

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class ShowMessageServicer(sentiment_analysis_rpc_pb2_grpc.ShowMessageServicer):

    def Show(self, request, context):
        return sentiment_analysis_rpc_pb2.OutputMessage(value='I am the python server, who are you ? , %s!' % request.value)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    sentiment_analysis_rpc_pb2_grpc.add_ShowMessageServicer_to_server(ShowMessageServicer(), server)
    server.add_insecure_port('[::]:7016')
    server.start()
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()
