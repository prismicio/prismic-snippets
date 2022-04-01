package com.prismicio.snippets;

import com.intellij.codeInsight.template.TemplateActionContext;
import com.intellij.codeInsight.template.TemplateContextType;
import org.jetbrains.annotations.NotNull;

public class JavaScriptReactContext extends TemplateContextType {
    protected JavaScriptReactContext() {
        super("JAVASCRIPTREACT", "JavaScriptReact");
    }

    @Override
    public boolean isInContext(@NotNull TemplateActionContext templateActionContext) {
        return templateActionContext.getFile().getName().endsWith(".jsx");
    }
}
