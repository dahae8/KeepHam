package com.ssafy.keepham.exceptionHandler;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
@Order(value = Integer.MIN_VALUE)
public class ApiExceptionHandler {

    @ExceptionHandler(value = ApiException.class)
    public ResponseEntity<Api<Object>> apiException(ApiException apiException){
        log.error("", apiException);

        var errorCode = apiException.getErrorCodeIfs();

        return ResponseEntity
                .status(errorCode.getHttpStatusCode())
                .body(
                        Api.ERROR(errorCode, apiException.getErrorDescription())
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Api<Object>> validationException(MethodArgumentNotValidException exception){
        BindingResult bindingResult = exception.getBindingResult();
        if (bindingResult.hasErrors()){
            StringBuilder sb = new StringBuilder();
            for (FieldError fieldError : bindingResult.getFieldErrors()){
                sb.append(fieldError.getField())
                        .append(": ")
                        .append(fieldError.getDefaultMessage())
                        .append(", ");
            }
            String errorMessage = sb.toString();
            errorMessage = errorMessage.substring(0, errorMessage.length() - 2);
            return ResponseEntity
                    .badRequest()
                    .body(
                            Api.ERROR(ErrorCode.INVALID_INPUT, errorMessage)
                    );
        }
        return ResponseEntity
                .status(500)
                .body(
                        Api.ERROR(ErrorCode.SERVER_ERROR)
                );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Api<Object>> sqlException (DataIntegrityViolationException exception){

        String errorMessage = "DB에 제약조건에 걸립니다. 저장하는 과정에서 에러가 발생했습니다." + exception.getLocalizedMessage();

        return ResponseEntity
                .status(400)
                .body(
                        Api.ERROR(ErrorCode.INVALID_INPUT, errorMessage)
                );

    }
    @ExceptionHandler({IllegalArgumentException.class, NoSuchElementException.class})
    public ResponseEntity<Api<Object>> handleCommonException(Exception e){
        var errorCode = e.getMessage();
        log.error("handleCommonException: {}", e.toString());
        return ResponseEntity
                .status(400)
                .body(Api.ERROR(ErrorCode.BAD_REQUEST));
    }

   @ExceptionHandler({AccessDeniedException.class})
   public ResponseEntity<Api<Object>> handleAccessDeniedException(Exception e){
        var errorCode = e.getMessage();
        log.error("handleAccessDeniedException : {}",errorCode);
        return ResponseEntity
                .status(403)
                .body(Api.ERROR(ErrorCode.DENIED_ERROR));
    }
   @ExceptionHandler({Exception.class})
    public ResponseEntity<Api<Object>> handleUnexpectedException(Exception e){
        var errorCode = e.getMessage();
        log.error("handleUnexpectedException : {}",errorCode);
        return ResponseEntity
                .status(500)
                .body(Api.ERROR(ErrorCode.SERVER_ERROR));
   }
}
