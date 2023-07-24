package com.ssafy.keepham.common.exception;

import com.ssafy.keepham.common.error.ErrorCodeIfs;

public interface ApiExceptionIfs {

    ErrorCodeIfs getErrorCodeIfs();

    String getErrorDescription();


}
