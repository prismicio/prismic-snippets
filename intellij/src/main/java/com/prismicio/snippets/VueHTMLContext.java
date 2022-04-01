package com.prismicio.snippets;

import com.intellij.codeInsight.template.TemplateActionContext;
import com.intellij.codeInsight.template.TemplateContextType;
import org.jetbrains.annotations.NotNull;

public class VueHTMLContext extends TemplateContextType {
    protected VueHTMLContext() {
        super("VUEHTML", "VueHTML");
    }

    @Override
    public boolean isInContext(@NotNull TemplateActionContext templateActionContext) {
        return templateActionContext.getFile().getName().endsWith(".vue");
    }
}
